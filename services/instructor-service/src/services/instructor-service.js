import Instructor from "../models/Instructor.js";
import ErrorResponse from "../utils/error-response.js";
import {validate} from "../validations/validation.js";
import {updateInstructorValidation} from "../validations/instructor-validation.js";
import s3Client from "../configs/aws.js";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import logger from "../configs/logging.js";
import * as fs from "fs";
import bcrypt from "bcrypt";
import {generateFileUrl} from "../utils/aws.js";
import AMQPConnector from "../configs/amqp-connector.js";

const findAll = async () => {
    const data = await Instructor.find({deletedAt: null})
        .populate('user')
        .sort({'user.createdAt': -1})
        .exec();

    return data;
}

const findById = async (id) => {
    const data = await Instructor.findById(id);

    return data;
}

const update = async (req) => {
    const id = req.params.id;

    try {
        const isInstructorExist = await Instructor.findById(id);

        if (!isInstructorExist) {
            throw new ErrorResponse(404, 'Instructor not found');
        }

        const instructor = await Instructor.findById(id);
        const requestData = req.body;

        const data = validate(updateInstructorValidation, req);
        let profilePictureName = null;

        if (req.file) {
            logger.info('Uploading file to S3');

            const file = req.file;
            const fileName = file.filename;

            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: fileName,
                Body: fs.readFileSync(`${process.cwd()}/public/uploads/${file.filename}`),
                ACL: "public-read",
            };

            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            profilePictureName = fileName;
        }

        const hashedPassword = requestData.password ? await bcrypt.hash(data.password, 10) : instructor.user.password;
        const profilePictureUrl = req.file ? generateFileUrl(profilePictureName) : instructor.user.profilePictureUrl;

        const user = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: 'instructor',
            profilePictureUrl: profilePictureUrl,
            isVerified: instructor.user.isVerified,
            rememberToken: instructor.user.rememberToken,
            createdAt: instructor.user.createdAt,
            updatedAt: new Date(),
        };

        const paymentData = {
            bank_name: requestData.bank_name ? requestData.bank_name : instructor.payment_data.bank_name,
            account_number: requestData.account_number ? requestData.account_number : instructor.payment_data.account_number,
            account_name: requestData.account_name ? requestData.account_name : instructor.payment_data.account_name,
        };

        const updatedInstructor = {
            user: user,
            registration_status: instructor.registration_status,
            phone_number: requestData.phone_number,
            summary: requestData.summary,
            payment_data: paymentData,
        };

        await Instructor.findOneAndUpdate({_id: id}, updatedInstructor, {new: true});

        const amqp = new AMQPConnector();

        const message = JSON.stringify({
            email: instructor.user.email,
            user: user,
        });

        await amqp.connect();
        await amqp.sendToQueue("update-user", message);
    } catch (e) {
        throw new ErrorResponse(200, e.message);
    }
}

const approve = async (req) => {
    const id = req.params.id;

    try {
        const isInstructorExist = await Instructor.findById(id);

        if (!isInstructorExist) {
            throw new ErrorResponse(404, 'Instructor not found');
        }

        await Instructor.findOneAndUpdate({_id: id}, {registration_status: 'approved'}, {new: true});
    }
    catch (e) {
        throw new ErrorResponse(200, e.message);
    }
}

const reject = async (req) => {
    const id = req.params.id;

    try {
        const isInstructorExist = await Instructor.findById(id);

        if (!isInstructorExist) {
            throw new ErrorResponse(404, 'Instructor not found');
        }

        await Instructor.findOneAndUpdate({_id: id}, {registration_status: 'rejected'}, {new: true});
    }
    catch (e) {
        throw new ErrorResponse(200, e.message);
    }
}

const ban = async (req) => {
    const id = req.params.id;

    try {
        const isInstructorExist = await Instructor.findById(id);

        if (!isInstructorExist) {
            throw new ErrorResponse(404, 'Instructor not found');
        }

        await Instructor.findOneAndUpdate({_id: id}, {registration_status: 'banned'}, {new: true});
    }
    catch (e) {
        throw new ErrorResponse(200, e.message);
    }
}

const destroy = async (req) => {
    const id = req.params.id;

    try {
        const isInstructorExist = await Instructor.findById(id);

        if (!isInstructorExist) {
            throw new ErrorResponse(404, 'Instructor not found');
        }

        await Instructor.findOneAndUpdate({_id: id}, {deletedAt: new Date(), 'registration_status': 'deleted',}, {new: true});
    }
    catch (e) {
        throw new ErrorResponse(200, e.message);
    }
}

export default {
    findAll,
    findById,
    update,
    approve,
    reject,
    ban,
    destroy,
}