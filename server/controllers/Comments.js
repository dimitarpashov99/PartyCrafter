const Comments = require("../models/comment");
const catchAsync = require("../utils/catchAsync");
const { body } = require("express-validator");
const commentService = require("../services/comments");
const handleValidation = require("../middlewares/handleValidation");

const create = [
    body("eventId").isEmpty().withMessage("Event Id required!"),
    body("comment")
        .isEmpty()
        .withMessage("A comment must be provided in request"),
    handleValidation,
    catchAsync(async (req, res) => {
        const eventId = req.body?.eventId;
        const comment = req.body?.comment;
        const result = await commentService.create(
            req.currentUser,
            eventId,
            comment
        );
        res.json(result);
    }),
];

const getEventComments = [
    handleValidation,
    catchAsync(async (req, res) => {
        const eventId = req.body?.eventId;
        const result = commentService.getAllAsQuery();
        res.json(result);
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
