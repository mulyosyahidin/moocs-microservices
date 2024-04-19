import loginService from "../services/login-service.js";

const login = async (req, res, next) => {
    try {
        const result = await loginService.login(req.body);

        res.status(200).json({
            success: true,
            message: 'Berhasil login',
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

export default {
    login,
}