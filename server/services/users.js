const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const ApiError = require("../utils/APIError");

const getById = async (userId) => {
    const user = await User.findById(userId);
    return user;
};

const editProfile = async (userId, data) => {
    const result = await User.findByIdAndUpdate(userId, { $set: data });
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Profile not found");
    }
    return result;
};

const banUser = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.status = "banned";
        await user.save();
    }
    return { success: true };
};

module.exports = {
    getById,
    editProfile,
    banUser,
};
