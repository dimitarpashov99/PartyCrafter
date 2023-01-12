const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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
            firstName: user.firstName,
            lastName: user.lastName,
        },
        accessToken: accessToken,
    };
};

const register = async (data) => {
    const creationDate = new Date();
    if (await User.isEmailTaken(data.email)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email is taken");
    }
    // Creates password hash
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = new User({
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        passwordHash: hash,
        registeredOn: creationDate,
    });

    return await newUser.save(function (err, user) {
        if (err) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Couldn't register new user"
            );
        }
        return user;
    });
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = User.findById(userId);
    if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
    }

    const match = await bcrypt.compare(oldPassword, user.passwordHash); 
    if(!match){
        throw new ApiError(StatusCodes.BAD_REQUEST, "User password doesn't match")
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;
    return await user.save();
};

module.exports = {
    login,
    register,
    changePassword
};
