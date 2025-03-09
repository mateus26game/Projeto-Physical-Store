import Logger from "../../../../config/logger";
import { StoreModel } from "../models/store.movie";
import { Request, Response } from "express";
import buscarCEP from "../services/viaCepService";


//pegar no get
export const getStores = async (req: Request, res: Response) => {
    try {
        const stores = await StoreModel.find();
        res.status(200).json(stores);
    } catch (e: any) {
        Logger.error(`Erro ao buscar lojas: ${e.message}`);
        res.status(500).json({ message: "Erro ao buscar lojas" });
    }
};



// get de via cep inutel tambem
export const buscarEnderecoComLoja = async (req: Request, res: Response) => {
    const { cep } = req.params;  
    
    
    const endereco = await buscarCEP(cep);
    
    if (!endereco) {
         res.status(404).json({ message: "Endereço não encontrado." });
    }

   res.status(200).json({
        endereco
    });
};

