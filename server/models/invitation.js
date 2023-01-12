const mongoose = require("mongoose");

const status = ["pending", "accepted", "rejected"];

const Invitation = mongoose.Schema({
    guestId: { type: String, required: true },
    eventCode: { type: String, required: true },
    guestName: { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },
    createdOn: { type: Date },
    status: { type: String, enum: status, default: "pending" },
});

module.exports = mongoose.model("Invitation", Invitation, "invitations");
