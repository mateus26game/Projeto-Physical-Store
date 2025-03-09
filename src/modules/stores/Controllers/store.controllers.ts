import { Request, Response } from "express";
import { StoreModel } from "../models/store.movie";
import Logger from "../../../../config/logger";
import buscarCEP from "../services/viaCepService";

// metodo criar loja post
export const createStores = async (req: Request, res: Response) => {
    try {
        const storesToInsert = Array.isArray(req.body) ? req.body : [req.body];

        const stores = await StoreModel.insertMany(storesToInsert); 
        res.status(201).json(stores);
    } catch (e: any) {
        res.status(500).json({ message: "Erro ao criar loja(s)", error: e.message });
    }
};


// apagar tudo nesssa ai delete
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



// atualiza os dados  post
export const updateStoreByName = async (req: Request, res: Response) => {
    try {
        const { nome_da_loja } = req.params; 
        const updatedStore = await StoreModel.findOneAndUpdate(
            { nome_da_loja }, 
            req.body,       
            { new: true }     
        );

        if (!updatedStore) {
            res.status(404).json({ message: "Loja não encontrada" });
        }

        Logger.info(`Loja ${nome_da_loja} foi atualizada com sucesso.`);
        res.status(200).json(updatedStore);
    } catch (e: any) {
        Logger.error(`Erro ao atualizar loja pelo nome: ${e.message}`);
        res.status(500).json({ message: "Erro ao atualizar loja" });
    }
};



// deletar por nome 
export const deleteStoreByName = async (req: Request, res: Response) => {
    try {
        const { nome_da_loja } = req.params; 
        const deletedStore = await StoreModel.findOneAndDelete({ nome_da_loja });

        if (!deletedStore) {
            res.status(404).json({ message: "Loja não encontrada" });
        }

        Logger.info(`Loja ${nome_da_loja} foi removida do banco de dados.`);
        res.status(200).json({ message: `Loja ${nome_da_loja} deletada com sucesso.` });
    } catch (e: any) {
        Logger.error(`Erro ao deletar loja: ${e.message}`);
        res.status(500).json({ message: "Erro ao deletar loja" });
    }
};
