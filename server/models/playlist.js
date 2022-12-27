const mongoose = require("mongoose");

const musicTrack = mongoose.Schema({
    name: { type: String },
    artist: { type: String },
    lengthInMinutes: { type: String },
    genre: { type: String },
});

const playlistSchema = mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    songList: [musicTrack],
    createdOn: { type: Date },
    createdBy: { type: String },
    likes: { type: Number, default: 0 },
});

const Playlist = mongoose.model("Playlist", playlistSchema, "music_playlists");
const MusicTrack = mongoose.model("MusicTrack", musicTrack);

module.exports = {
    Playlist,
    MusicTrack,
};
