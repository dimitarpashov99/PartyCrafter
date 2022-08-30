const Events = require("../models/partyEvent");
const Comments = require("../models/comment");
const apiResponse = require("../helpers/apiResponse");

const create = (req, res, next) => {
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
    next();
};

const getEventComments = (req, res, next) => {
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
};

const getUserComments = (req, res, next) => {
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
};

const remove = (req, res, next) => {
    Comments.deleteOne(
        {
            _id: req.body.eventId,
        },
        (err) => {
            if (err) {
                apiResponse.errorResponse(res, "Comment could't be deleted");
            } else {
                apiResponse.successResponse(res, "Comment deleted successfuly");
            }
        }
    );
    next();
};

module.exports = { create, getEventComments, getUserComments, remove };
