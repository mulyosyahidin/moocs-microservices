import Joi from "joi";
import validate from "../configs/validation.js";
import User from "../models/User.js";
import * as bcrypt from "bcrypt";
import ErrorResponse from "../utils/error-response.js";
import {generateJwtToken} from "../utils/jwt.js";

const login = async (request) => {
    const loginValidation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    const user = validate(loginValidation, request);

    const checkIsUserExist = await User.findOne({email: user.email}).exec();

    if (!checkIsUserExist || !(await bcrypt.compare(user.password, checkIsUserExist.password))) {
        throw new ErrorResponse(200, 'Email atau password salah');
    }

    const loggedUser = await User.findOne({email: user.email}).exec();
    let rememberToken = loggedUser.rememberToken;

    if (!rememberToken) {
        rememberToken = Math.random().toString(36).substring(6);

        await User.updateOne({_id: loggedUser._id}, {rememberToken: rememberToken});
    }

    loggedUser.rememberToken = rememberToken;

    const refreshTokenData = {
        sub: loggedUser._id,
        rememberToken: rememberToken,
    };

    return {
        user: loggedUser,
        access_token: generateJwtToken({user: loggedUser}),
        refresh_token: generateJwtToken(refreshTokenData, '7d'),
    };
}

export default {
    login,
}