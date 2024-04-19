import amqplib from "amqplib";
import logger from "./logging.js";

class AMQPConnector {
    constructor() {
        this.url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`;
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqplib.connect(this.url);
            this.channel = await this.connection.createChannel();

            logger.info(`Connected to RabbitMQ at ${this.url}`);
        } catch (error) {
            logger.error(`Failed to connect to RabbitMQ at ${this.url}`);
            logger.error(error);
        }
    }

    async sendToQueue(queueName, message) {
        try {
            if (!this.channel) {
                throw new Error('Channel is not initialized. Call connect() first.');
            }

            await this.channel.assertQueue(queueName);
            await this.channel.sendToQueue(queueName, Buffer.from(message));

            logger.info(`Message sent to queue ${queueName}`);
        } catch (error) {
            logger.error(`Failed to send message to queue ${queueName}: ${error.message}`);
        }
    }

    getConnection() {
        return this.connection;
    }
}

export default AMQPConnector;
