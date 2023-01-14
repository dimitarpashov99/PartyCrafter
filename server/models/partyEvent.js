const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    address: { type: Object },
    type: { type: String, required: true },
    privateAccess: { type: Boolean, required: true },
    date: { type: Date, required: true },
    hostId: { type: String, required: true },
    guestList: { type: Array, required: true },
    foodMenu: { type: Object },
    imageURL: { type: String },
    rating: { type: Number, default: 0 },
    musicPlaylist: { type: Object },
    tableCount: { type: Number, default: 0 },
    preferences: { type: Object },
});

module.exports = mongoose.model("Event", eventSchema);
