const bcrypt = require("bcrypt");
const User = require("../models/user");

const { createTokens } = require("../helpers/authHelper");
const apiResponse = require("../helpers/apiResponse");
const register = (req, res) => {
    const creationDate = new Date();

    // Creates password hash
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const newUser = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            passwordHash: hash,
            registeredOn: creationDate,
        });

        try {
            newUser.save(function (err, user) {
                if (err) {
                    apiResponse.errorResponse(
                        res,
                        "Couldn't register new user"
                    );
                } else {
                    const userData = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                    };

                    apiResponse.successResponseWithData(
                        res,
                        "Registration Success.",
                        userData
                    );
                }
            });
        } catch (err) {
            apiResponse.errorResponse(res);
        }
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .lean()
        .then((user) => {
            if (!user) {
                res.status(400).json({ error: "User Doesn't Exist" });
            } else {
                console.log(user);
                try {
                    const dbPassword = user.passwordHash;
                    bcrypt.compare(password, dbPassword).then((match) => {
                        if (!match) {
                            res.status(400).json({
                                error: "Wrong Email and Password Combination!",
                            });
                        } else {
                            const accessToken = createTokens(user);

                            res.cookie("access-token", accessToken, {
                                maxAge: 60 * 60 * 24 * 30 * 1000,
                                httpOnly: true,
                            });

                            res.json("LOGGED IN");
                        }
                    });
                } catch {
                    apiResponse.notFoundResponse(res, "");
                }
            }
            return user;
        });
};

module.exports = { register, login };
