import { Router } from "express";
import { createStores,  deleteAllStores, deleteStoreByName, updateStoreByName  } from "../Controllers/store.controllers";
import { buscarComLoja } from "../Controllers/cep.controllers";
import { buscarEnderecoComLoja, getStores } from "../Controllers/get.Controllers";
const router = Router();

router.post("/stores", createStores);
router.get("/stores", getStores); 
router.delete("/stores", deleteAllStores); 
router.delete("/stores/:nome_da_loja", deleteStoreByName); 
router.put("/stores/:nome_da_loja", updateStoreByName);
router.get("/lojas/:cep", buscarEnderecoComLoja);
router.get("/lojass/:cep",buscarComLoja);



export default router;
