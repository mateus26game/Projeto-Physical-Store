import { Request, Response } from "express";
import { StoreModel } from "../models/store.movie";
import Logger from "../../../../config/logger";
import buscarCEP from "../services/viaCepService";
import { LocationService, StoreService } from "../services/nominatim";

// metodo post
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


// mwtuto get
export const getStores = async (req: Request, res: Response) => {
    try {
        const stores = await StoreModel.find();
        res.status(200).json(stores);
    } catch (e: any) {
        Logger.error(`Erro ao buscar lojas: ${e.message}`);
        res.status(500).json({ message: "Erro ao buscar lojas" });
    }
};

// apagar tudo nesssa porra
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


// get diferente
export const deleteStoreByName = async (req: Request, res: Response) => {
    try {
        const { nome_da_loja } = req.params; // Obtem o nome da loja a partir dos parâmetros da URL
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

// atualiza os dados da tabela quase inutil
export const updateStoreByName = async (req: Request, res: Response) => {
    try {
        const { nome_da_loja } = req.params; // Obtém o nome da loja da URL
        const updatedStore = await StoreModel.findOneAndUpdate(
            { nome_da_loja }, // Critério de busca
            req.body,         // Dados para atualizar
            { new: true }     // Retorna o documento atualizado
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

// get de via cep inutel tambem
export const buscarEnderecoComLoja = async (req: Request, res: Response) => {
    const { cep } = req.params;  // Pega o 'cep' da URL
    
    // Chama a função que consulta o ViaCEP com o 'cep' da URL
    const endereco = await buscarCEP(cep);
    
    if (!endereco) {
         res.status(404).json({ message: "Endereço não encontrado." });
    }

   res.status(200).json({
        endereco
    });
};


