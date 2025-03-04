import morgan, {StreamOptions} from "morgan";

import config from "config";

import Logger from "../../../../config/logger";
import dotenv from "dotenv";

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    const env = config.get<string>("env")|| "develpment"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method :url :status - :res[content-length] bytes - :response-time ms",
    {stream, skip}
)

export default morganMiddleware;