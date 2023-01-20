const mongoose = require("mongoose");

const status = ["pending", "accepted", "rejected"];

const Invitation = mongoose.Schema({
    eventId: { type: String, required: true, ref: "PartyEvents" },
    guestName: { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },
    createdOn: { type: Date, required: true },
    status: { type: String, enum: status, default: "pending", required: true },
});

module.exports = mongoose.model("Invitation", Invitation, "invitations");
