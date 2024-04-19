import verifyNewPasswordService from "../services/verify-new-password-service.js";

const verify = async (req, res, next) => {
    try {
        await verifyNewPasswordService.verify(req.body);

        res.status(200).json({
            success: true,
            message: 'Berhasil membuat password baru',
        });
    }
    catch (e) {
        next(e);
    }
}

export default {
    verify
}