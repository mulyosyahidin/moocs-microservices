import logoutService from "../services/logout-service.js";

const logout = async (req, res, next) => {
    try {
        await logoutService.logout(req);

        res.status(200).json({
            success: true,
            message: 'Berhasil logout',
        });
    } catch (e) {
        next(e);
    }
}

export default {
    logout,
}