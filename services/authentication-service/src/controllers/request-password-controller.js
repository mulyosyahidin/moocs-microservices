import requestPasswordService from "../services/request-password-service.js";

const requestPassword = async (req, res, next) => {
    try {
        await requestPasswordService.requestResetPassword(req.body);

        res.status(200).json({
            success: true,
            message: 'Email berisi tautan reset password telah dikirimkan ke email Anda',
        });
    } catch (e) {
        next(e);
    }
}

export default {
    requestPassword,
}
