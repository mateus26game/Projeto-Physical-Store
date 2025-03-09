import { Request, Response } from "express";
import { StoreModel } from "../models/store.movie";
import Logger from "../../../../config/logger";
import buscarCEP from "../services/viaCepService";
import { LocationService } from "../services/nominatim";

export const buscarComLoja = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cep } = req.params;

        const endereco = await buscarCEP(cep);
        if (!endereco) {
            res.status(404).json({ message: "Endereço não encontrado." });
            return;
        }

        const coordenadas = await LocationService.getCoordinatesByCep(cep);
        if (!coordenadas || !coordenadas.latitude || !coordenadas.longitude) {
            res.status(404).json({ message: "Coordenadas não encontradas." });
            return;
        }

        console.log("\n=========================================");
        console.log(`📍 Coordenadas do CEP (${cep}):`);
        console.log(`   ➝ Latitude: ${coordenadas.latitude}`);
        console.log(`   ➝ Longitude: ${coordenadas.longitude}`);
        console.log("=========================================\n");

        const lojas = await StoreModel.find();
        if (!lojas || lojas.length === 0) {
            res.status(404).json({ message: "Nenhuma loja encontrada." });
            return;
        }

        const lojasComDistancia = lojas.map((loja) => {
            const distancia = calcularDistancia(
                coordenadas.latitude,
                coordenadas.longitude,
                loja.latitude,
                loja.longitude
            );

            return {
                nome: loja.nome_da_loja,
                endereco: loja.rua,
                cidade: loja.cidade,
                estado: loja.estado,
                latitude: loja.latitude,
                longitude: loja.longitude,
                distancia_km: distancia.toFixed(2)
            };
        });

        lojasComDistancia.sort((a, b) => parseFloat(a.distancia_km) - parseFloat(b.distancia_km));

        const lojasProximas = lojasComDistancia.filter(loja => parseFloat(loja.distancia_km) <= 100);
        const lojasDistantes = lojasComDistancia.filter(loja => parseFloat(loja.distancia_km) > 100);

        if (lojasProximas.length === 0) {
            console.log("⚠️ Nenhuma loja encontrada em um raio de 100 km do CEP informado.\n");
        } else {
            console.log("🏪 LOJAS PRÓXIMAS:");
            lojasProximas.forEach(loja => {
                console.log("-----------------------------------------");
                console.log(`📌 Nome: ${loja.nome}`);
                console.log(`📍 Endereço: ${loja.endereco}`);
                console.log(`🏙️ Cidade: ${loja.cidade} - ${loja.estado}`);
                console.log(`📏 Distância: ${loja.distancia_km} km`);
                console.log("-----------------------------------------\n");
            });
        }

        if (lojasDistantes.length > 0) {
            console.log("📍 LOJAS DISTANTES (+100 km):");
            lojasDistantes.forEach(loja => {
                console.log("-----------------------------------------");
                console.log(`📌 Nome: ${loja.nome}`);
                console.log(`📍 Endereço: ${loja.endereco}`);
                console.log(`🏙️ Cidade: ${loja.cidade} - ${loja.estado}`);
                console.log(`📏 Distância: ${loja.distancia_km} km`);
                console.log("-----------------------------------------\n");
            });
        }

        res.status(200).json({
            cep,
            endereco,
            coordenadas,
            lojas_proximas: lojasProximas,
            lojas_distantes: lojasDistantes,
            mensagem: lojasProximas.length === 0 ? "Nenhuma loja encontrada em um raio de 100 km." : undefined
        });

    } catch (error) {
        Logger.error(`Erro ao buscar dados: ${error}`);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};

// Função para calcular a distância entre duas coordenadas (Haversine)
function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
