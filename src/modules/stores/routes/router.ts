import { Router } from "express";
import { createStores, getStores, deleteAllStores } from "../Controllers/store.controllers";

const router = Router();

router.post("/stores", createStores);
router.get("/stores", getStores); 
router.delete("/stores", deleteAllStores); 

export default router;
