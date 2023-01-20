const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    eventId: { type: String, required: true, ref: "PartyEvent" },
    title: { type: String, required: true },
    body: { type: String, required: false },
    senderId: { type: String, required: true },
    date: { type: Date },
    rate: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Event", commentSchema);
