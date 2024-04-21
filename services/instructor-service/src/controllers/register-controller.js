import registerService from "../services/register-service.js";

const register = async (req, res, next) => {
    try {
        await registerService.register(req);

        res.status(201).json({
            success: true,
            message: 'Berhasil mendaftar sebagai instruktur',
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
}