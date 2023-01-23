const catchAsync = require("../utils/catchAsync");
const service = require("../services/comments");

const create = [
    catchAsync(async (req, res) => {
        const commentData = req.body?.commentData;
        const result = await service.createComment(
            commentData
        );
        res.json(result);
    }),
];
const getById = [
    catchAsync(async (req, res) => {
        const menuId = req.params?.id;
        const result = await service.getCommentById(menuId);
        res.json(result);
    }),
];

const getAll = [
    catchAsync(async (req, res) => {
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const result = await service.getAllCommentsAsQuery(filter);
        res.json(result);
    }),
];
const update = [
    catchAsync(async (req, res) => {
        const commentId = req.params.id;
        const data = req.body.menuData;
        const result = await service.updateComment(commentId, data);
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const commentId = req.params.id;
        const result = await service.deleteComment(commentId);
        res.json(result);
    }),
];

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove,
};
