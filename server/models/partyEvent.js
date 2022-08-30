const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  privateAccess: { type: Boolean, required: true },
  date: { type: Date, required: true },
  hostId: { type: String, required: true },
  guestList: { type: Array, required: true },
  foodMenu: { type: Object, required: false },
  musicPlaylist: { type: Object, required: false },
  status: { type: Object, required: true },
  preferences: { type: Object },
  code: { type: mongoose.Types.ObjectId },
});

module.exports = mongoose.model("Event", eventSchema);
