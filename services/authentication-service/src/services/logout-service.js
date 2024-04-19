import User from "../models/User.js";

const logout = async (req, res) => {
    const user = req.user;

    const userId = user._id;

    // update user remove rememberToken
    return User.updateOne({_id: userId}, {
        rememberToken: null,
    });
}

export default {
    logout,
}