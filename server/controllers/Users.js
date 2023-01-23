const catchAsync = require("../utils/catchAsync");

const userService = require("../services/users");

const getById = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await userService.getUserById(userId);
    res.json({
        profile: result,
    });
});

const create = catchAsync(async (req, res) => {
    const userData = req.body.userData;
    const result = await userService.createUser(userData);
    res.json({
        profile: result,
    });
});

const update = catchAsync(async (req, res) => {
    const userId = req.params.u;
    const userData = req.body.userData;
    const result = await userService.updateUser(userId, userData);
    res.json({
        profile: result,
    });
});

const remove = catchAsync(async (req, res) => {
    const userId = req.params.u;
    const result = await userService.deleteUser(userId);
    res.json({
        profile: result,
    });
});


module.exports = {
    getById,
    create,
    update,
    remove,
};
