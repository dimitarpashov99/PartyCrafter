const mongoose = require("mongoose");

const address = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    city: { type: Date, required: true },
    country: { type: String, required: true },
});

module.exports = mongoose.model("Address", address);
