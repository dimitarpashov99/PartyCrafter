const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const MusicPlaylist = require("../models/playlist");

const createMusicPlaylist = async (userId, data) => {
    const songList = data.songList.map((song) => {
        var musicTrack = {
            name: song.name,
            artist: song.artist,
            lengthInMinutes: song.lengthInMinutes,
            genre: song.genre,
        };
        return musicTrack;
    });

    const newPlaylist = new MusicPlaylist({
        title: data.title,
        shortDescription: data.description,
        createdBy: userId,
        songList: songList,
        createdOn: new Date(),
        likes: 0,
    });
    return await newPlaylist.save((err) => {
        if (err) {
            throw new ApiError(StatusCodes.BAD_REQUEST, err.message);
        }
    });
};

const getMusicPlaylistById = async (userId, playlistId) => {
    const playlist = await MusicPlaylist.findOne({
        _id: playlistId,
        userId: userId,
    });
    if (!playlist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Playlist not found");
    }
    return playlist;
};

const getAllMusicPlaylistsAsQuery = async (filter) => {
    const customPlaylist = await MusicPlaylist.find(filter);
    if (!customPlaylist) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
    }
    return customPlaylist;
};

const updateMusicPlaylist = async (id, playlistData) => {
    return await MusicPlaylist.findByIdAndUpdate(id, { $set: playlistData });
};

const deleteMusicPlaylist = async (id) => {
    return await Menu.findByIdAndRemove(id);
};

module.exports = {
    createMusicPlaylist,
    getMusicPlaylistById,
    getAllMusicPlaylistsAsQuery,
    updateMusicPlaylist,
    deleteMusicPlaylist,
};
