import axios from "axios";
import { StoreModel } from "../models/store.movie";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export class LocationService {
    /**
     * Obtém latitude, longitude e endereço de um CEP via OpenStreetMap (Nominatim)
     * @param cep CEP do Brasil
     */
    static async getCoordinatesByCep(cep: string) {
        try {
            const response = await axios.get(`${NOMINATIM_URL}?format=json&q=${cep},Brazil`);

            if (response.data.length === 0) {
                throw new Error("Coordenadas não encontradas.");
            }

            const { lat, lon, display_name } = response.data[0];

            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
                endereco: display_name
            };
        } catch (error) {
            console.error("Erro ao buscar coordenadas:", error);
            return null;
        }
    }
}



export class StoreService {
   
    static async getStoresWithDistance(latCEP: number, lonCEP: number) {
        try {
            // Busca todas as lojas no banco
            const stores = await StoreModel.find();

            // Mapeia as lojas, calculando a distância para cada uma
            const storesWithDistance = stores.map(store => {
                const distance = calcularDistancia(latCEP, lonCEP, store.latitude, store.longitude);
                return {
                    nome: store.nome_da_loja,
                    endereco: `${store.rua}, ${store.bairro}, ${store.cidade} - ${store.estado}`,
                    latitude: store.latitude,
                    longitude: store.longitude,
                    distancia_km: distance.toFixed(2) // Distância arredondada para 2 casas decimais
                };
            });

            return storesWithDistance;
        } catch (error) {
            console.error("Erro ao buscar lojas:", error);
            return [];
        }
    }
}

export function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}


