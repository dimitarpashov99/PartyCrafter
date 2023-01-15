const mongoose = require("mongoose");

const Address = mongoose.Schema({
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    city: { type: Date, required: true },
    country: { type: String, required: true },
});

const AddressBook = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    addresses: [Address],
});

module.exports = mongoose.model("AddressBook", AddressBook);
