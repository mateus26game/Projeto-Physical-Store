import { Request, Response } from "express";
import { createStore } from "../services/store.service";


const createStoreHandler = async (req: Request, res: Response) => {
  try {
    res.status(201).send({ message: 'Store created successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while creating the store.' });
  }
};
