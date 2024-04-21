import { validate } from "../validations/validation.js";
import { storeCategoryValidation } from "../validations/category-validation.js";
import ErrorResponse from "../utils/error-response.js";
import slugify from "slugify";
import * as fs from "fs";
import Category from "../models/Category.js";
import { Op, or } from "sequelize";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../configs/aws.js";
import logger from "../configs/logging.js";

const findAll = async () => {
    return await Category.findAll({
        where: {
            parent_id: null
        },
        include: {
            model: Category,
            as: 'children',
        }
    });
}

const findById = async (id) => {
    const category = await Category.findByPk(id, {
        include: {
            model: Category,
            as: 'children',
        }
    });

    if (!category) {
        throw new ErrorResponse(200, 'Kategori tidak ditemukan');
    }

    return category;
}

const store = async (req) => {
    const category = validate(storeCategoryValidation, req);

    const countCategory = await Category.count({
        where: {
            name: category.name
        }
    });

    if (countCategory > 0) {
        throw new ErrorResponse(409, 'Kategori dengan nama tersebut sudah ada');
    }

    if (req.file) {
        logger.info('Uploading file to S3');

        const file = req.file;

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: file.filename,
            Body: fs.readFileSync(`${process.cwd()}/public/uploads/${file.filename}`),
            ACL: "public-read",
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
    }

    const picture = req.file ? req.file.filename : null;
    const name = category.name;
    const slug = slugify(name, {
        lower: true,
    });
    const parentId = category.parent_id;

    return await Category.create({
        name,
        slug,
        picture,
        parent_id: parentId,
    });
}

const update = async (req) => {
    const category = validate(storeCategoryValidation, req);
    const categoryId = parseInt(req.params.id);

    const countCategory = await Category.count({
        where: {
            name: category.name,
            id: {
                [Op.ne]: categoryId,
            }
        }
    });

    if (countCategory > 0) {
        throw new ErrorResponse(409, 'Kategori dengan nama tersebut sudah ada');
    }

    const getCategory = await Category.findByPk(categoryId);

    if (req.file && getCategory.picture) {
        const picturePath = `./public/uploads/${getCategory.picture}`;

        if (fs.existsSync(picturePath)) {
            fs.unlinkSync(picturePath);
        }

        // remove picture from S3
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: getCategory.picture,
        };

        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
    }

    if (req.file) {
        const file = req.file;

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: file.filename,
            Body: fs.readFileSync(`${process.cwd()}/public/uploads/${file.filename}`),
            ACL: "public-read",
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
    }

    const picture = req.file ? req.file.filename : null;
    const name = category.name;
    const slug = slugify(name, {
        lower: true,
    });
    const parentId = category.parent_id;

    await getCategory.update({
        name,
        slug,
        picture,
        parent_id: parentId,
    });

    return getCategory;
}

const destroy = async (id) => {
    const category = await Category.findByPk(id);

    if (!category) {
        throw new ErrorResponse(200, 'Kategori tidak ditemukan');
    }

    if (category.picture) {
        const picturePath = `./public/uploads/${category.picture}`;

        if (fs.existsSync(picturePath)) {
            fs.unlinkSync(picturePath);
        }
    }

    return await category.destroy();
}

export default {
    findAll,
    findById,
    store,
    update,
    destroy,
}