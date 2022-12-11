const bcrypt = require("bcrypt");

const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const { createTokens } = require("../helpers/authHelper");
const apiResponse = require("../helpers/apiResponse");

const register = [
    body("firstName")
        .isLength({ min: 1 })
        .trim()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("lastName")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Last name must be specified.")
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters."),
    body("email")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Email must be specified.")
        .isEmail()
        .withMessage("Email must be a valid email address.")
        .custom((value) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject("E-mail already in use");
                }
            });
        }),
    body("password")
        .isLength({ min: 6 })
        .trim()
        .withMessage("Password must be 6 characters or greater."),
    (req, res) => {
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
    },
];

const login = [
    body("email")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Request must contain email.")
        .not()
        .isEmail()
        .withMessage("Email must be a valid email address."),
    body("password")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Request must contain password."),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        User.findOne({ email: email })
            .lean()
            .then((user) => {
                if (!user) {
                    res.status(400).json({ error: "User Doesn't Exist" });
                } else {
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
    },
];

module.exports = { register, login };
