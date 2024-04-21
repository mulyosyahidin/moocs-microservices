const welcome = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Instructor Service!',
    });
}

export default {
    welcome,
}