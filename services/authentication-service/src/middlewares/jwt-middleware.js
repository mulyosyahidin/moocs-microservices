import jwt from "jsonwebtoken";
import logger from "../configs/logging.js";
import User from "../models/User.js";

const parser = (allowedRoles = []) => {
    return async (req, res, next) => {
        const token = req.header('authorization');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Sertakan token header authorization',
            }).end();
        }

        try {
            const accessToken = token.split(' ')[1];
            const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

            if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Akses ditolak. Anda tidak memiliki izin yang cukup.',
                }).end();
            }

            const userId = decodedToken.user._id;
            const rememberToken = decodedToken.user.rememberToken;

            const user = await User.findOne({_id: userId});

            if (user.rememberToken !== rememberToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Token tidak valid',
                }).end();
            }

            req.user = decodedToken.user;

            return next();
        } catch (e) {
            logger.error(e.message);

            return res.status(401).json({
                success: false,
                message: e.message,
            }).end();
        }
    };
}

export default {
    parser,
}