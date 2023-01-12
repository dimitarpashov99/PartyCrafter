const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const User = require("../models/user");

const getProfile = async (userId) => {
    const profile = await User.findOne({ _id: userId });
    if (!profile) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Profile not found");
    }
    return profile;
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
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    user.status = "banned";
    await user.save();

    return { success: true };
};

module.exports = {
    getProfile,
    editProfile,
    banUser
};
