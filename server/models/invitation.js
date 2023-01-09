const mongoose = require("mongoose");

const status = ["pending", "accepted", "rejected"];

const Invitation = mongoose.Schema({
    eventId: { type: mongoose.Types.ObjectId, required: true },
    guestName: { type: String },
    guestEmail: { type: String },
    isGuestRegistered: { type: Boolean },
    createdOn: { type: Date },
    status: { type: String, enum: status, default: "pending" },
});

module.exports = mongoose.model("Invitation", Invitation, "invitations");
