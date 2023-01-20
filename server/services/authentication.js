const bcrypt = require("bcrypt");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.TOKEN_SECRET_KEY
    );
};

const login = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User Doesn't Exist");
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Wrong Email and Password Combination!",
            false
        );
    }

    const accessToken = generateToken(user);
    return {
        profile: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        inviteCode: user.inviteCode,
        accessToken: accessToken,
    };
};

const register = async (data) => {
    const creationDate = new Date();
    const emailTaken = await User.isEmailTaken(data.email);
    if (emailTaken) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email is taken");
    }
    // Creates password hash
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: hash,
        registeredOn: creationDate,
    });

    return await newUser.save(function (err) {
        if (err) {
            throw new ApiError(StatusCodes.BAD_REQUEST, err.message);
        }
        return { success: true };
    });
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
    }

    const match = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!match) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "User password doesn't match"
        );
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;
    return await user.save();
};

const generateGuestToken = (guestId, eventId) => {
    return jwt.sign(
        {
            guestId: guestId,
            eventId: eventId,
            isGuestToken: true,
        },
        process.env.TOKEN_SECRET_KEY
    );
};

module.exports = {
    login,
    register,
    changePassword,
    generateGuestToken,
};
