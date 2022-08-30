const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    id: { type: String },
    eventId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: false },
    senderId: { type: String, required: true },
    date: { type: Date },
    likes: { type: Number },
});

module.exports = mongoose.model("Event", commentSchema);
