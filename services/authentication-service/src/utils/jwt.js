import jwt from "jsonwebtoken";

export const generateJwtToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiresIn});
}