import mongoose from "mongoose";

const roles = ["user", "admin"];
const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  role: { type: String, enum: roles, default: "user" },
});

export default mongoose.model("User", userSchema);
