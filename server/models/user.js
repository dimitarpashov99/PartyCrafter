const mongoose = require("mongoose");

const roles = ["user", "organizer", "admin"];
const status = ["active", "inactive", "banned"];

const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        phoneNumber: { type: String },
        role: { type: String, enum: roles, default: "user" },
        lastSignedIn: { type: Date },
        registeredOn: { type: Date },
        status: { type: String, enum: status, default: "inactive" },
    },
    {
        statics: {
            isEmailTaken: async function (email) {
                const result = await this.findOne({ email: email })
                    .then((err, doc) => {
                        return !!doc;
                    })
                    .catch(() => {
                        return true;
                    });
                return result;
            },
        },
    }
);

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", userSchema, "users");
