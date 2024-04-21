import AMQPConnector from "../configs/amqp-connector.js";
import logger from "../configs/logging.js";
import User from "../models/User.js";

const amqp = new AMQPConnector();

const AMQPListener = async () => {
    await amqp.connect();

    await amqp.listenToQueue('update-user', async (message) => {
        logger.info(`update-user is received new message`);

        const data = JSON.parse(message);
        const {email, user} = data;

        await User.findOneAndUpdate({email: email}, user, {new: true});

        logger.info(`User with email ${email} is updated`);
    });
}

export default AMQPListener;