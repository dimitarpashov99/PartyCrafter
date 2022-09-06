const apiResponse = require("../helpers/apiResponse");

const FoodMenus = require("../models/foodMenu").FoodMenu;
const MenuItem = require("../models/foodMenu").MenuItem;
const User = require("../models/user");
const createCustomFoodMenu = (req, res) => {
    User.findOne({ id: req.body.userId }, (err, user) => {
        if (err) {
            apiResponse.notFoundResponse(res, "User not found!");
        } else {
            const foodMenuData = req.body.menuData;
            const foodMenuItems = foodMenuData.menuItems.map((item) => {
                return new MenuItem({
                    type: item.type,
                    itemCategory: item.itemCategory,
                    itemName: item.itemName,
                });
            });
            const newFoodMenu = new FoodMenus({
                title: foodMenuData,
                createdBy: user._id,
                menuItems: foodMenuItems,
                createdOn: new Date(),
                likes: 0,
            });
            newFoodMenu.save((err) => {
                if (err) {
                    apiResponse.errorResponse(res, "Menu cannot be created");
                } else {
                    apiResponse.successResponse(
                        res,
                        "Menu created successfuly"
                    );
                }
            });
        }
    });
};

const getFoodMenuById = (req, res) => {
    FoodMenus.findOne({ _id: req.params.menuId }, (err, menu) => {
        if (err) {
            apiResponse.errorResponse(res, "Error! Menu couldn't be found");
        } else {
            apiResponse.notFoundResponse(res, "Menu doesn't exist");
            apiResponse.successResponseWithData(res, "Menu found", menu);
        }
    });
};

const getAllFoodMenus = (req, res) => {
    FoodMenus.find({ createdBy: req.params.userId }, (err, menu) => {
        if (err) {
            apiResponse.notFoundResponse(res, "Error! Menus couldn't be found");
        } else {
            if (!menu) {
                apiResponse.notFoundResponse(
                    res,
                    "This user doesn't have any custom food menus"
                );
            }
            apiResponse.successResponseWithData(res, "Menu found", menu);
        }
    });
};

const updateCustomFoodMenu = (req, res) => {
    FoodMenus.findOneAndUpdate({ _id: req.params.menuId }, (err, menu) => {
        if (err) {
            apiResponse.errorResponse(
                res,
                "Error! Food menu couldn't be updated"
            );
        } else {
            if (!menu) {
                apiResponse.notFoundResponse(res, "No menus with id found");
            } else {
                apiResponse.successResponse(
                    res,
                    "Food menu updated successfuly"
                );
            }
        }
    });
};

const removeCustomFoodMenu = (req, res) => {
    FoodMenus.findOneAndDelete(
        {
            _id: req.params.menuId,
        },
        (err, doc) => {
            if (err) {
                apiResponse.errorResponse(
                    res,
                    "Error! Food menu couldn't be deleted"
                );
            } else {
                if (!doc) {
                    apiResponse.notFoundResponse(res, "No menus with id found");
                } else {
                    apiResponse.successResponse(
                        res,
                        "Food menu deleted successfuly"
                    );
                }
            }
        }
    );
};

module.exports = {
    createCustomFoodMenu,
    getFoodMenuById,
    getAllFoodMenus,
    updateCustomFoodMenu,
    removeCustomFoodMenu,
};
