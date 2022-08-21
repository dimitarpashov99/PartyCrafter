import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  type: { type: String, required: true },
  private: {type: Boolean, required: true},
  date: { type: Date, required: true },
  hostId: { type: String, required: true },
  guestList: { type: Array, required: true },
  foodMenu: { type: Object, required: false },
  musicPlaylist: { type: Object, required: false },
  status: { type: Object, required: true },
  pictures: { type: Array, required: false },
});

export default mongoose.model("Event", eventSchema);
