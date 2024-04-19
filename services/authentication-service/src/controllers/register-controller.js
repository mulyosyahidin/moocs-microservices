import registerService from "../services/register-service.js";

const register = async (req, res, next) => {
    try {
        const result = await registerService.register(req.body);

        res.status(201).json({
            success: true,
            message: 'Berhasil membuat akun baru',
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
}