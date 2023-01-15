const mongoose = require("mongoose");

const musicTrack = mongoose.Schema({
    name: { type: String },
    artist: { type: String },
    duration: { type: String },
    genre: { type: String },
});

const playlistSchema = mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    songList: { type: [musicTrack], required: true },
    createdOn: { type: Date, required: true },
    createdBy: { type: mongoose.Types.ObjectId , ref: 'User'},
    likes: { type: String, default: 0 },
});

module.exports = mongoose.model("Playlist", playlistSchema, "music-playlists");

