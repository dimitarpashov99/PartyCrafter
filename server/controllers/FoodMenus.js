const catchAsync = require("../utils/catchAsync");
const foodMenuService = require("../services/menus");

const createCustomFoodMenu = [
    catchAsync(async (req, res) => {
        const menuData = req.body?.menuData;
        const result = await foodMenuService.createCustomMenu(
            req.currentUser.id,
            menuData
        );
        res.json(result);
    }),
];
const getFoodMenuById = [
    catchAsync(async (req, res) => {
        const menuId = req.params?.id;
        const result = await foodMenuService.getById(menuId);
        res.json(result);
    }),
];

const getFoodMenusByUserId = [
    catchAsync(async (req, res) => {
        const result = await foodMenuService.getAllCustomMenus(
            req.currentUser.id
        );
        res.json(result);
    }),
];

const updateCustomFoodMenu = [
    catchAsync(async (req, res) => {
        const menuId = req.params.id;
        const data = req.body.menuData;
        const result = await foodMenuService.updateCustomMenu(menuId, data);
        res.json(result);
    }),
];

const removeCustomFoodMenu = [
    catchAsync(async (req, res) => {
        const menuId = req.params.id;
        const result = await foodMenuService.removeCustomFoodMenu(menuId);
        res.json(result);
    }),
];

module.exports = {
    createCustomFoodMenu,
    getFoodMenuById,
    getFoodMenusByUserId,
    updateCustomFoodMenu,
    removeCustomFoodMenu,
};
