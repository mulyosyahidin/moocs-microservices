import logger from "../configs/logging.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/error-response.js";
import crypto from "crypto";
import ResetPassword from "../models/ResetPassword.js";
import AMQPConnector from "../configs/message-broker.js";
import * as fs from "fs";

const requestResetPassword = async (request) => {
    const email = request.email;

    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ErrorResponse(200, 'User dengan email tersebut tidak ada');
    }

    const token = crypto.randomBytes(32).toString('hex');

    await ResetPassword.create({
        email: email,
        token: token,
    });

    const resetUrl = `${process.env.WEB_URL}/forgot-password/verify?email=${email}&token=${token}`;

    const emailTemplate = fs.readFileSync(`${process.cwd()}/storage/email-templates/forget-password.html`, 'utf-8');

    const replacer = {
        reset_url: resetUrl,
    };

    const emailContent = emailTemplate.replace(/{{\s?(\w+)\s?}}/g, (match, key) => {
        return replacer[key] || match;
    });

    const amqp = new AMQPConnector();

    const message = JSON.stringify({
       subject: 'Lupa Password Vocasia.id?',
       to: email,
       text_content: `Klik link berikut untuk mereset password Anda: ${resetUrl}`,
        html_content: emailContent,
    });

    await amqp.connect();
    await amqp.sendToQueue("send-email", message);
}

export default {
    requestResetPassword,
}