import jwt from "jsonwebtoken";

export const generateJwtToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiresIn});
}