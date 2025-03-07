import { Router } from "express";
import { createStores, getStores, deleteAllStores, deleteStoreByName, updateStoreByName, buscarEnderecoComLoja  } from "../Controllers/store.controllers";
import buscarCEP from "../services/viaCepService";
import { buscarComLoja } from "../Controllers/cep.controllers";
const router = Router();

router.post("/stores", createStores);
router.get("/stores", getStores); 
router.delete("/stores", deleteAllStores); 
router.delete("/stores/:nome_da_loja", deleteStoreByName); 
router.put("/stores/:nome_da_loja", updateStoreByName);
router.get("/lojas/:cep", buscarEnderecoComLoja);
router.get("/lojass/:cep",buscarComLoja);

//router.get("/distancia/:cep1",  calculaAdistacia100metros);


export default router;
