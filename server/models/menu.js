const mongoose = require("mongoose");

const itemTypes = ["none", "food", "drink"];

const MenuItem = mongoose.Schema({
    type: { type: String, enum: itemTypes, default: "none" },
    itemCategory: { type: String },
    itemName: { type: String },
});

const FoodMenuSchema = mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    menuItems: [MenuItem],
    createdOn: { type: Date },
    likes: { type: Number, default: 0 },
    isCustom: { type: Boolean, default: false },
});

const FoodMenu = mongoose.model("FoodMenu", FoodMenuSchema, "food_menus");

module.exports = { FoodMenu, MenuItem };