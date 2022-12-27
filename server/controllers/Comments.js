const Events = require("../models/partyEvent");
const Comments = require("../models/comment");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const { body } = require("express-validator");
const handleValidation = require("../middlewares/handleValidation");

const create = [
    body("eventId").isEmpty().withMessage("Event Id required!"),
    handleValidation,
    catchAsync(async (req, res) => {
        Events.findOneAndUpdate(
            {
                _id: req.body.eventId,
            },
            (err, event) => {
                if (err) {
                    apiResponse.errorResponse(res, "Event not found");
                } else {
                    event;
                }
            }
        );
    }),
];

const getEventComments = [
    handleValidation,
    catchAsync(async (req, res) => {
        Comments.find(
            {
                userId: req.param.userId,
            },
            (err, docs) => {
                if (err) {
                    apiResponse.errorResponse(res, "Comment not found");
                } else {
                    if (docs.length === 0) {
                        apiResponse.notFoundResponse(res, "Comment not found");
                    } else {
                        apiResponse.successResponseWithData(
                            res,
                            docs.length + "comments found for this user",
                            docs
                        );
                    }
                }
            }
        );
    }),
];

const getUserComments = [
    catchAsync(async (req, res, next) => {
        Comments.find(
            {
                userId: req.param.userId,
            },
            (err, docs) => {
                if (err) {
                    apiResponse.errorResponse(res, "Comment not found");
                } else {
                    if (docs.length === 0) {
                        apiResponse.notFoundResponse(res, "Comment not found");
                    } else {
                        apiResponse.successResponseWithData(
                            res,
                            docs.length + "comments found for this user",
                            docs
                        );
                    }
                }
            }
        );
        next();
    }),
];

const deleteComment = [
    catchAsync(async (req, res, next) => {
        Comments.deleteOne(
            {
                _id: req.body.eventId,
            },
            (err) => {
                if (err) {
                    apiResponse.errorResponse(
                        res,
                        "Comment could't be deleted"
                    );
                } else {
                    apiResponse.successResponse(
                        res,
                        "Comment deleted successfuly"
                    );
                }
            }
        );
        next();
    }),
];

module.exports = { create, getEventComments, getUserComments, deleteComment };
