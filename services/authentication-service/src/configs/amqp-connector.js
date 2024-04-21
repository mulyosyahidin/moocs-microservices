import amqplib from "amqplib";
import logger from "./logging.js";
import {RabbitMQConnectionUrl} from "./string.js";

class AMQPConnector {
    constructor() {
        this.url = RabbitMQConnectionUrl;
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqplib.connect(this.url);
            this.channel = await this.connection.createChannel();

            logger.info(`amqplib is connected to RabbitMQ at ${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
        } catch (error) {
            logger.error(`amqplib failed to RabbitMQ at ${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
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
    
    async listenToQueue(queueName, callback) {
        try {
            if (!this.channel) {
                throw new Error('Channel is not initialized. Call connect() first.');
            }

            await this.channel.assertQueue(queueName);
            await this.channel.consume(queueName, (message) => {
                if (message) {
                    callback(message.content.toString());
                    
                    this.channel.ack(message);
                }
            });

            logger.info(`AQMP is listening to queue ${queueName}`);
        } catch (error) {
            logger.error(`Failed to listen to queue ${queueName}: ${error.message}`);
        }
    }

    getConnection() {
        return this.connection;
    }
}

export default AMQPConnector;
