import { Request, Response } from "express";
import { StoreModel } from "../models/store.movie";
import Logger from "../../../../config/logger";
import buscarCEP from "../services/viaCepService";
import { LocationService } from "../services/nominatim";

export const buscarComLoja = async (req: Request, res: Response) => {
    try {
        const { cep } = req.params; // Pega o 'cep' da URL

        // 1️⃣ Consulta o ViaCEP para obter cidade e estado
        const endereco = await buscarCEP(cep);
        if (!endereco) {
            res.status(404).json({ message: "Endereço não encontrado." });
            return; // Evita continuar a execução
        }

        // 2️⃣ Obtém as coordenadas do CEP via Nominatim (OpenStreetMap)
        const coordenadas = await LocationService.getCoordinatesByCep(cep);

        if (!coordenadas || !coordenadas.latitude || !coordenadas.longitude) {
            res.status(404).json({ message: "Coordenadas não encontradas." });
            return;
        }

        // 3️⃣ Busca todas as lojas do banco de dados
        const lojas = await StoreModel.find();

        // 4️⃣ Responde com as informações (sem calcular distância)
        res.status(200).json({
            cep,
            endereco,
            coordenadas,
            lojas
        });

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};
