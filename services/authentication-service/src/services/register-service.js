import Joi from "joi";
import validate from "../configs/validation.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/error-response.js";
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import {generateJwtToken} from "../utils/jwt.js";

const register = async (request) => {
    const registerValidation = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    const user = validate(registerValidation, request);

    const isUserExist = await User.findOne({email: user.email}).exec();

    if (isUserExist) {
        throw new ErrorResponse(409, 'Email tersebut sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
        'email': user.email,
        'name': user.name,
        'password': hashedPassword,
        'rememberToken': Math.random().toString(36).substring(6),
    };

    const createdUser = await User.create(newUser);

    const refreshTokenData = {
        sub: createdUser._id,
        rememberToken: createdUser.rememberToken,
    };

    return {
        user: createdUser,
        access_token: generateJwtToken({user: createdUser}),
        refresh_token: generateJwtToken(refreshTokenData, '7d'),
    };
}

export default {
    register,
}