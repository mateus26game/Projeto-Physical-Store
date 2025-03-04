import mongoose from "mongoose"
import config from "config"
import Logger from "./logger"


async function connect(){

    const dbUri = config.get<string>("dbUrl")

    try{

        await mongoose.connect(dbUri)
        Logger.info("Conectou ao banco de dadoa")

    }catch(e){
        Logger.error("não foi possivel conectar!");
        Logger.error(`Erro: ${e}`);
    }

}

export default connect;