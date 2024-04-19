import app from "./configs/web.js";
import logger from "./configs/logging.js";
import messageBrokerConsumerService from "./services/message-broker-consumer-service.js";

app.listen(process.env.APP_PORT, async () => {
    logger.info(`Server is running on port ${process.env.APP_PORT}`);

    await messageBrokerConsumerService();
});