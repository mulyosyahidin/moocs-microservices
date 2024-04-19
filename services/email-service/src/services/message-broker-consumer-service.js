import {connect} from "amqplib";
import logger from "../configs/logging.js";
import {transporter} from "../configs/email.js";
import {RabbitMQConnectionUrl} from "../configs/string.js";

const messageBrokerConsumer = async () => {
    try {
        const connection = await connect(RabbitMQConnectionUrl);
        const channel = await connection.createChannel();

        logger.info(`Service connected to RabbitMQ at ${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);

        await channel.consume('send-email', (message) => {
            let data = message.content.toString();
            data = JSON.parse(data);

            logger.info(`New email command received: "${data.subject}" to ${data.to}`);

            const mailOptions = {
                from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_SENDER}>`,
                to: data.to,
                subject: data.subject ?? 'Vocasia.id Mailer',
                text: data.text_content ?? '-',
                html: data.html_content ?? '',
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    logger.error(error);
                } else {
                    logger.info(`Email sent: ${info.response}`);
                }
            });
        }, {
            noAck: true,
        });
    }
    catch (e) {
        logger.error(e.message);
    }
}

export default messageBrokerConsumer