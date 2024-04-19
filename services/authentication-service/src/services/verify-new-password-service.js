import ResetPassword from "../models/ResetPassword.js";
import ErrorResponse from "../utils/error-response.js";
import User from "../models/User.js";
import * as bcrypt from "bcrypt";

const verify = async (request) => {
    const email = request.email;
    const token = request.token;
    const newPassword = request.password;

    const requestData = await ResetPassword.findOne({email: email, token: token}).exec();

    if (!requestData) {
        throw new ErrorResponse(400, 'Email atau token tidak valid!');
    }

    const createdAt = requestData.createdAt;

    // expire at 1 hour
    const expireAt = new Date(createdAt);
    expireAt.setHours(expireAt.getHours() + 1);

    if (new Date() > expireAt) {
        throw new ErrorResponse(400, 'Token sudah kadaluarsa!');
    }

    // remove token
    await ResetPassword.deleteOne({
        email: email,
        token: token,
    }).exec();

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.updateOne({email: email}, {password: hashedPassword}).exec();

    if (!user) {
        throw new ErrorResponse(500, 'Gagal membuat password baru!');
    }

    return user;
}

export default {
    verify,
}