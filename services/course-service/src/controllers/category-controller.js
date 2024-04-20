import categoryService from "../services/category-service.js";

const index = async (req, res,next) => {
    try {
        const categories = await categoryService.findAll();

        res.json({
            success: true,
            message: 'Berhasil mendapatkan data kategori',
            data: categories,
        });
    }
    catch (e) {
        next(e);
    }
}

const store = async (req, res,next) => {
    try {
        await categoryService.store(req);

        console.log(req.body, req.file);

        res.status(201).json({
            success: true,
            message: 'Berhasil menambah data kategori',
        });
    }
    catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const category = await categoryService.findById(req.params.id);

        res.json({
            success: true,
            message: 'Berhasil mendapatkan data kategori',
            data: category,
        });
    }
    catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        await categoryService.update(req);

        res.json({
            success: true,
            message: 'Berhasil memperbarui data kategori',
        });
    }
    catch (e) {
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        await categoryService.destroy(req.params.id);

        res.json({
            success: true,
            message: 'Berhasil menghapus data kategori',
        });
    }
    catch (e) {
        next(e);
    }
}

export default {
    store,
    index,
    show,
    update,
    destroy,
}