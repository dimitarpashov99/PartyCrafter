const mongoose = require("mongoose");

const address = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    address1: { type: String, required: false },
    address2: { type: String, required: true },
    city: { type: Date },
    country: { type: Number },
});

module.exports = mongoose.model("Address", address);
