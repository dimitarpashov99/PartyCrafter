import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  details: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  lng: { type: Number },
  lat: { type: Number },
});

export default mongoose.model("Location", locationSchema, "locations");
