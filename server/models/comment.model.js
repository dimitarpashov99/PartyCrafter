import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  id: { type: String },
  eventId: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: false },
  sender: { type: String, required: true },
  date: {type: Date},
  likes: {type: Number},
});

export default mongoose.model("Event", commentSchema);
