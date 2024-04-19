import meService from "../services/me-service.js";

const me = async (req, res, next) => {
    try {
        const result = await meService.me(req);

        res.status(200).json({
            success: true,
            message: 'Berhasil mendapatkan data user',
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

export default {
    me,
}