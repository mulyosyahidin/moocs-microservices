const welcome = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Course Service!',
    });
}

export default {
    welcome,
}