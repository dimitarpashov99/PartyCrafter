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
    menuItems: { type: [MenuItem], required: true },
    createdOn: { type: Date, required: true },
    userId: {type: mongoose.Types.ObjectId, required: true},
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("FoodMenu", FoodMenuSchema, "food-menus");
