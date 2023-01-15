const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const User = require("../models/user");

const getUserById = async (userId) => {
    const profile = await User.findById(userId);
    if (!profile) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    return profile;
};

const updateUser = async (userId, data) => {
    const result = await User.findByIdAndUpdate(userId, { $set: data });
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    return result;
};

const deleteUser = async (userId) => {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    return result;
};

module.exports = {
    getUserById,
    updateUser,
    deleteUser,
};
