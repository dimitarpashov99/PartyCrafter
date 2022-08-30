const mongoose = require("mongoose");

const foodMenuSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  playlist: { type: Array, required: false },
  createdOn: { type: Date },
  createdBy: { type: String },
  price: { type: Object },
  likes: { type: Number },
});

module.exports = mongoose.model("FoodMenu", foodMenuSchema);
