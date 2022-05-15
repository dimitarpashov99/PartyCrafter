import mongoose from "mongoose";

const themePatternSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  createdOn: { type: Date, required: true },
  foodMenu: { type: Array, required: false },
  musicPlaylist: { type: Array, required: false },
  status: { type: Object, required: true },
  themePattern: { type: Object, required: true },
  pictures: {type: Array, required: false}
});

export default mongoose.model("ThemePattern", themePatternSchema);
