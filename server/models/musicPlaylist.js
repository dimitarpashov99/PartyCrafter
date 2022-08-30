const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  songList: { type: Array, required: false },
  createdOn: {type: Date},
  likes: {type: Number},
});

module.exports = mongoose.model("Playlist", playlistSchema, 'music-playlists');
