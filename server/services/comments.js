const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/comment");
const ApiError = require("../utils/APIError");


const createComment = async (data) => {
    const newComment = new Comment({
        eventId: data.eventId,
        senderId: data.userId,
        body: data.body,
        createOn: data.createOn || new Date(),
        likes: 0,
    });
    await newComment.save();
    return { success: true };
};

const getCommentById = async (commentId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
    }
    return comment;
};

const getAllCommentsAsQuery = async (filter) => {
    const comments = await Comment.find(filter);
    if (!comments) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comments not found");
    }
    return comments;
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
    createComment,
    getCommentById,
    getAllCommentsAsQuery,
    updateComment,
    deleteComment,
};
