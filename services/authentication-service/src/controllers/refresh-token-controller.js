import refreshTokenService from "../services/refresh-token-service.js";

const refreshToken = async (req, res, next) => {
    try {
        const result = await refreshTokenService.refreshToken(req);

        res.status(200).json({
            success: true,
            message: 'Berhasil membuat akses token baru',
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

export default {
    refreshToken,
}