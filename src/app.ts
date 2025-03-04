require("dotenv").config();

import  express  from "express";
import  config  from "config";

const app = express()

app.use(express.json());

import db from "../config/db"

import router from "./router"

import Logger from "../config/logger";

import morganMiddleware from "./middleware/morganMiddlewarw";

app.use(morganMiddleware);


app.use("/api/",router);


import { request } from "http";

app.use("/api/",router);

const port = config.get<number>("port");

app.listen(3000, async () =>{
    await db();

    Logger.info(`Aplicacao esta na porta ${port}`);
});