const User = require("../models/user");

const apiResponse = require("../helpers/apiResponse");

const getUserProfile = (req, res, next) => {
    try {
        const requestedId = req.params.id;
        const user = User.find({
            _id: requestedId,
        });

        res.status(200);
        res.json({
            user: user,
        });
    } catch (err) {
        apiResponse.errorResponse(res, 'Service error');
    }
    return next();
};

const changeEmail = (req, res, next) => {
    try {
        User.findOneAndUpdate(
            {
                _id: req.body.userId,
            },
            {
                email: req.body.newEmail,
            },
            (err) => {
                if (err) {
                    apiResponse.errorResponse(res, "User not found!");
                } else {
                    apiResponse.successResponse(res, "Email changed!");
                }
            }
        );
    } catch (err) {
        apiResponse.errorResponse(res, 'Service error');
    }
    return next();
};

const changePassword = (req, res, next) => {
    return next();
};

module.exports = {
    getUserProfile,
    changeEmail,
    changePassword,
};
