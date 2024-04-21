import instructorService from "../services/instructor-service.js";

const index = async (req, res, next) => {
    try {
        const data = await instructorService.findAll();

        res.json({
            success: true,
            message: 'Berhasil mendapatkan data instruktur',
            data: data,
        });
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await instructorService.findById(id);

        res.json({
            success: true,
            message: 'Berhasil mendapatkan data instruktur',
            data: data,
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        await instructorService.update(req);

        res.json({
            success: true,
            message: 'Berhasil memperbarui data instruktur',
        });
    } catch (e) {
        next(e);
    }
}

const approve = async (req, res, next) => {
    try {
        await instructorService.approve(req);

        res.json({
            success: true,
            message: 'Berhasil menyetujui pendafataran instruktur',
        });
    } catch (e) {
        next(e);
    }
}

const reject = async (req, res, next) => {
    try {
        await instructorService.reject(req);

        res.json({
            success: true,
            message: 'Berhasil menolak pendafataran instruktur',
        });
    } catch (e) {
        next(e);
    }
}

const ban = async (req, res, next) => {
    try {
        await instructorService.ban(req);

        res.json({
            success: true,
            message: 'Berhasil memblokir instruktur',
        });
    } catch (e) {
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        await instructorService.destroy(req);

        res.json({
            success: true,
            message: 'Berhasil menghapus instruktur',
        });
    } catch (e) {
        next(e);
    }
}

export default {
    index,
    show,
    update,
    approve,
    reject,
    ban,
    destroy
}