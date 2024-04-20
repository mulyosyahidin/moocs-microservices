import ErrorResponse from "../utils/error-response.js";
import pkg from "joi";
import logger from "../configs/logging.js";

const {ValidationError} = pkg;

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (err instanceof ErrorResponse) {
        res.status(err.status).json({
            success: false,
            message: err.message,
        }).end();
    } else if (err instanceof ValidationError) {
        res.status(422).json({
            success: false,
            message: err.message,
        }).end();
    } else {
        logger.error(err.message, err);

        res.status(500).json({
            success: false,
            message: err.message,
        }).end();
    }
}

export default errorMiddleware;