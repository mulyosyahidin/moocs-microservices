import mongoose from 'mongoose';
import logger from "./logging.js";

const MongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        logger.info(`MongoDB connection SUCCESS to ${process.env.MONGO_URI}`);
    } catch (error) {
        logger.error(`MongoDB connection FAIL to ${process.env.MONGO_URI}: ${error}`);

        process.exit(1);
    }
}

export default MongoDB;