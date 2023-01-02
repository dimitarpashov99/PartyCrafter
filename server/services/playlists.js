const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const MusicPlaylist = require("../models/playlist");

const create = async (userId, data) => {
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

const getById = async (userId, playlistId) => {
    const playlist = await MusicPlaylist.findOne({
        _id: playlistId,
        userId: userId,
    });
    if (!playlist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Playlist not found");
    }
    return playlist;
};

const getAllCustomPlaylists = async (userId) => {
    const customMenu = await Menu.find({ createdBy: userId });
    if (!customMenu) {
        throw new ApiError(StatusCodes.NOT_FOUND, err.message);
    }
    return customMenu;
};

const updateCustomPlaylist = async (id, playlistData) => {
    return await Menu.findByIdAndUpdate(id, { $set: playlistData });
};

const deleteCustomPlaylist = async (id) => {
    return await Menu.findByIdAndRemove(id);
};

module.exports = {
    create,
    getById,
    getAllCustomPlaylists,
    updateCustomPlaylist,
    deleteCustomPlaylist,
};
