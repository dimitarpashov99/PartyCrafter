const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");
const invitation = require("../models/invitation");

/**
 * Authentication middleware to verify authorization token
 *
 * @param {object} req - request
 * @param {object} res - response
 * @param {function} next - next middleware
 *
 */

const authenticateUser = (req, res, next) => {
    let token;
    const authorizationHeader = req.headers["authorization"];

    if (authorizationHeader) {
        token = authorizationHeader.split(" ")[1];
    }

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "UNAUTHORIZED! You are not authorized to perform this operation!",
                });
            } else {
                if (decoded.isGuestToken) {
                    invitation
                        .findOne({
                            guestId: decoded.guestId,
                            eventCode: decoded.eventCode,
                        })
                        .then((guest) => {
                            if (!guest) {
                                res.status(StatusCodes.NOT_FOUND).json({
                                    error: "Requested guest is not valid",
                                });
                            } else {
                                next();
                            }
                        });
                } else {
                    User.findOne({
                        id: decoded.id,
                        email: decoded.email,
                    }).then((user) => {
                        if (!user) {
                            res.status(StatusCodes.NOT_FOUND).json({
                                error: "Requested user was't found",
                            });
                        } else {
                            req.currentUser = user;
                            next();
                        }
                    });
                }
            }
        });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            error: "No access token provided",
        });
    }
};

module.exports = authenticateUser;
