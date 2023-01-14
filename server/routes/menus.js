const express = require("express");

const router = express.Router();
const controller = require("../controllers/FoodMenus");

const requireToken = require("../middlewares/authenticate");

router
    .route("/menus/")
    .get(requireToken, controller.getFoodMenusByUserId)
    .post(requireToken, controller.createCustomFoodMenu);

router
    .route("/menus/:id")
    .get(requireToken, controller.getFoodMenuById)
    .put(requireToken, controller.updateCustomFoodMenu)
    .delete(requireToken, controller.removeCustomFoodMenu);
