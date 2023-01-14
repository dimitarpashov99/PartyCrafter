const catchAsync = require("../utils/catchAsync");
const foodMenuService = require("../services/menus");

const create = [
    catchAsync(async (req, res) => {
        const menuData = req.body?.menuData;
        const result = await foodMenuService.createFoodMenu(
            req.currentUser.id,
            menuData
        );
        res.json(result);
    }),
];
const getById = [
    catchAsync(async (req, res) => {
        const menuId = req.params?.id;
        const result = await foodMenuService.getFoodMenuById(menuId);
        res.json(result);
    }),
];

const getAll = [
    catchAsync(async (req, res) => {
        const filter = req.params?.id;
        const result = await foodMenuService.getAllFoodMenusAsQuery(filter);
        res.json(result);
    }),
];
const update = [
    catchAsync(async (req, res) => {
        const menuId = req.params.id;
        const data = req.body.menuData;
        const result = await foodMenuService.updateFoodMenu(menuId, data);
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const menuId = req.params.id;
        const result = await foodMenuService.removeFoodMenu(menuId);
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
