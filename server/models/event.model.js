import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  hostId: { type: String, required: true },
  guestList: { type: Array, required: true },
  foodMenu: { type: Array, required: false },
  musicPlaylist: { type: Array, required: false },
  themePattern: { type: Object, required: true },
  status: { type: Object, required: true },
  pictures: { type: Array, required: false },
});

export default mongoose.model("Event", eventSchema);
