import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";

// Tipo explícito para retornar um Promise com um tipo Response
export const createMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
      
        return res.status(201).json(" Deu certo o controlle ");  // Retorna o filme criado com status 201
    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);  // Registra o erro no Logger
        return res.status(500).json({ message: "Erro interno do servidor" });  // Retorna erro 500
    }
};
