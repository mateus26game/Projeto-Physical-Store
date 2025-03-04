import { Router, Request, Response } from "express";
import { createMovie } from "./Controllers/movieControllers";

const router = Router();

// Definindo as rotas
router.get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working!");
}).post("/movie", async (req: Request, res: Response) => {
    try {
        await createMovie(req, res);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});


router.post("/movie", async (req: Request, res: Response) => {
    try {
        await createMovie(req, res);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;
