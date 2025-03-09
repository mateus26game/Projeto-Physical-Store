import axios from "axios";
import { StoreModel } from "../models/store.movie";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export class LocationService {
  
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

