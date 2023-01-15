const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const Menu = require("../models/menu");

const getFoodMenuById = async (menuId) => {
    const menu = Menu.findById(menuId);
    if (!menu) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Food menu not found");
    }
    return menu;
};

const createFoodMenu = async (menuData) => {
    const newFoodMenu = new Menu({
        title: menuData?.title,
        createdBy: menuData?.userId,
        createdOn: new Date(),
        likes: 0,
    });

    menuData.menuItems.forEach((item) => {
        newFoodMenu.menuItems.create({
            type: item.type,
            itemCategory: item.itemCategory,
            itemName: item.itemName,
        });
    });

    return await newFoodMenu.save();
};

const getAllFoodMenusAsQuery = async (filter) => {
    const customMenu = await Menu.find(filter);
    if (!customMenu) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No food menus found");
    }
    return customMenu;
};

const updateFoodMenu = async (menuId, menuData) => {
    return await Menu.findByIdAndUpdate(menuId, { $set: menuData });
};

const removeFoodMenu = async (menuId) => {
    return await Menu.findByIdAndRemove(menuId);
};

module.exports = {
    createFoodMenu,
    getFoodMenuById,
    getAllFoodMenusAsQuery,
    updateFoodMenu,
    removeFoodMenu,
};
