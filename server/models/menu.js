const mongoose = require("mongoose");

const itemTypes = ["none", "food", "drink"];

const menuItem = mongoose.Schema({
    type: { type: String, enum: itemTypes, default: "none" },
    itemCategory: { type: String },
    itemName: { type: String },
});

const foodMenuSchema = mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    menuItems: [menuItem],
    createdOn: { type: Date },
    likes: { type: Number, default: 0 },
});

const FoodMenu = mongoose.model("FoodMenu", foodMenuSchema, 'food_menus');
const MenuItem = mongoose.model("MenuItem", menuItem);

module.exports = { FoodMenu , MenuItem};
