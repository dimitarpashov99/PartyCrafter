const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createTokens } = require("../utils/authHelper");
const ApiError = require("../utils/APIError");

const login = async (email, password) => {
    return await User.findOne({ email: email })
        .lean()
        .then((user) => {
            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, "User Doesn't Exist");
            } else {
                const dbPassword = user.passwordHash;
                bcrypt.compare(password, dbPassword).then((match) => {
                    if (!match) {
                        throw new ApiError(
                            StatusCodes.NOT_FOUND,
                            "Wrong Email and Password Combination!"
                        );
                    } else {
                        const accessToken = createTokens(user);
                        return {
                            profile: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                            },
                            accessToken: accessToken,
                        };
                    }
                });
            }
        });
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
module.exports = {
    login,
    register,
};
