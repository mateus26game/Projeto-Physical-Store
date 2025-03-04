import { Request, Response } from "express";
import { StoreModel } from "../models/store.movie";
import Logger from "../../../../config/logger";

// Criar uma ou várias lojas
export const createStores = async (req: Request, res: Response) => {
    try {
        // Se for um único objeto (não é um array), coloca ele em um array
        const storesToInsert = Array.isArray(req.body) ? req.body : [req.body];

        // Usando insertMany para adicionar um ou mais documentos
        const stores = await StoreModel.insertMany(storesToInsert); 
        res.status(201).json(stores);
    } catch (e: any) {
        res.status(500).json({ message: "Erro ao criar loja(s)", error: e.message });
    }
};


// Buscar todas as lojas
export const getStores = async (req: Request, res: Response) => {
    try {
        const stores = await StoreModel.find();
        res.status(200).json(stores);
    } catch (e: any) {
        Logger.error(`Erro ao buscar lojas: ${e.message}`);
        res.status(500).json({ message: "Erro ao buscar lojas" });
    }
};


export const deleteAllStores = async (req: Request, res: Response) => {
    try {
        await StoreModel.deleteMany({}); // Apaga todos os registros da coleção
        Logger.info("Todas as lojas foram removidas do banco de dados.");
        res.status(200).json({ message: "Todas as lojas foram deletadas com sucesso." });
    } catch (e: any) {
        Logger.error(`Erro ao deletar todas as lojas: ${e.message}`);
        res.status(500).json({ message: "Erro ao deletar todas as lojas" });
    }
};