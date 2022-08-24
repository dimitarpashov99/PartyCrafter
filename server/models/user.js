import mongoose from "mongoose";

const roles = ["user", "admin"];
const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: roles, default: "user" },
  lastSignedIn: { type: Date },
  registeredOn: { type: Date },
});

export default mongoose.model("User", userSchema, 'users');
