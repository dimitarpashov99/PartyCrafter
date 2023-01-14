const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const Menu = require("../models/menu");

const getFoodMenuById = async (menuId) => {
    const menu = Menu.findById(menuId);
    if (!menu) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
    }
    return menu;
};

const createFoodMenu = async (menuData) => {
    const newFoodMenu = new Menu({
        title: foodMenuData,
        createdBy: user._id,
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

    await newFoodMenu.save();
};

const getAllFoodMenusAsQuery = async (userId) => {
    const customMenu = await Menu.find({ createdBy: userId });
    if (!customMenu) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
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
