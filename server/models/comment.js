const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    eventId: { type: String, required: true, ref: "PartyEvent" },
    title: { type: String, required: true },
    body: { type: String, required: false },
    senderId: { type: String, required: true },
    date: { type: Date },
    likes: { type: Number },
});

module.exports = mongoose.model("Event", commentSchema);
