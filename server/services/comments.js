const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/comment");
const ApiError = require("../utils/APIError");

const create = async (userId, eventId, data) => {
    const newComment = new Comment({
        eventId: eventId,
        senderId: userId,
        ...data,
    });
    await newComment.save();
    return { success: true };
};

const getById = async (commentId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
    }
    return comment;
};

const getAllAsQuery = async (filter) => {
    return await Comment.find(filter).exec();
};

const updateComment = async (commentId, data) => {
    const comment = await Comment.findByIdAndUpdate(commentId, data);
    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
    }
    return comment;
};

const deleteComment = async (commentId) => {
    const comment = await Comment.findByIdAndRemove(commentId);
    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
    }
    return comment;
};

module.exports = {
    create,
    getById,
    getAllAsQuery,
    updateComment,
    deleteComment,
};
