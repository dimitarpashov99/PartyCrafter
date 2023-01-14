const mongoose = require("mongoose");

const status = ["pending", "accepted", "rejected"];

const Invitation = mongoose.Schema({
    eventCode: { type: String, required: true },
    guestId: { type: String, required: true },
    guestName: { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },
    guestInviteCode: { type: String },
    createdOn: { type: Date, required: true },
    status: { type: String, enum: status, default: "pending", required: true },
});

module.exports = mongoose.model("Invitation", Invitation, "invitations");
