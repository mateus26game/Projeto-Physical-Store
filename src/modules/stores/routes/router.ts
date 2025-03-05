import { Router } from "express";
import { createStores, getStores, deleteAllStores, deleteStoreByName, updateStoreByName } from "../Controllers/store.controllers";

const router = Router();

router.post("/stores", createStores);
router.get("/stores", getStores); 
router.delete("/stores", deleteAllStores); 
router.delete("/stores/:nome_da_loja", deleteStoreByName); 
router.put("/stores/:nome_da_loja", updateStoreByName);

export default router;
