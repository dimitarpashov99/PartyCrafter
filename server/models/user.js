const mongoose = require("mongoose");

const roles = ["user", "organizer", "admin"];
const status = ["active", "inactive", "banned"];

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, enum: roles, default: "user" },
    lastSignedIn: { type: Date },
    registeredOn: { type: Date },
    inviteCode: { type: String, required: true },
    status: { type: String, enum: status, default: "inactive" },
});

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});

userSchema.methods.isEmailTaken = async (email) => {
    const user = await this.findOne({ email: email });
    return !!user;
};

module.exports = mongoose.model("User", userSchema, "users");
