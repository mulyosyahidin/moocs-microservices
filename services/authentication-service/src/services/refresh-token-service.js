import logger from "../configs/logging.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {generateJwtToken} from "../utils/jwt.js";
import ErrorResponse from "../utils/error-response.js";

const refreshToken = async (req, res, next) => {
    const token = req.header('x-refresh-token');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.sub;
    const rememberToken = decodedToken.rememberToken;

    const user = await User.findOne({_id: userId}).exec();

    if (user.rememberToken !== rememberToken) {
        throw new ErrorResponse(401, 'Token tidak valid');
    }

    const refreshTokenData = {
        sub: userId,
        rememberToken: rememberToken,
    };

    return {
        access_token: generateJwtToken({user: user}),
        refresh_token: generateJwtToken(refreshTokenData, '7d'),
    }
}

export default {
    refreshToken,
}