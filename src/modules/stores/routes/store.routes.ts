import { Router } from "express";
import { createStore } from "../services/store.service";

const router = Router();

router.post("/stores", createStore); 

export default router;
