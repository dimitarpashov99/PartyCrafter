const mongoose = require("mongoose");

const roles = ["user", "admin"];
const userSchema = mongoose.Schema({
    id: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, enum: roles, default: "user" },
    lastSignedIn: { type: Date },
    registeredOn: { type: Date },
});

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});
module.exports = mongoose.model("User", userSchema, "users");
