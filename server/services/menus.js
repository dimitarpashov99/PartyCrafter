const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const Menu = require("../models/menu");

const getById = async (menuId) => {};

const createCustomMenu = async (userId, menuData) => {
    const user = User.findById(userId);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
    }

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

const getCustomMenu = async (userId, menuId) => {
    const customMenu = await Menu.find({ _id: menuId, createdBy: userId });
    if (!customMenu) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
    }
    return customMenu;
};

const getAllCustomMenus = async (userId) => {
    const customMenu = await Menu.find({ createdBy: userId });
    if (!customMenu) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
    }
    return customMenu;
};

const updateCustomMenu = async (menuId, menuData) => {
    return await Menu.findByIdAndUpdate(menuId, { $set: menuData });
};

const deleteCustomMenu = async (menuId) => {
    return await Menu.findByIdAndRemove(menuId);
};

module.exports = {
    createCustomMenu,
    getById,
    getCustomMenu,
    getAllCustomMenus,
    updateCustomMenu,
    deleteCustomMenu,
};
