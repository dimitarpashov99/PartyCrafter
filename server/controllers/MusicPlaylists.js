const apiResponse = require("../utils/apiResponse");

const MusicPlaylists = require("../models/playlist").Playlist;
const MusicTrack = require("../models/playlist").MusicTrack;

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const createCustomMusicPlaylist = [
    catchAsync(async (req, res) => {
        User.findOne({ id: req.body.userId }, (err, user) => {
            if (err) {
                apiResponse.notFoundResponse(res, "User not found!");
            } else {
                const playListData = req.body.playListData;
                const songList = playListData.songList.map((song) => {
                    var musicTrack = new MusicTrack({
                        name: song.name,
                        artist: song.artist,
                        lengthInMinutes: song.lengthInMinutes,
                        genre: song.genre,
                    });
                    return musicTrack;
                });
                const newPlaylist = new MusicPlaylists({
                    title: playListData.title,
                    shortDescription: playListData.description,
                    createdBy: user._id,
                    songList: songList,
                    createdOn: new Date(),
                    likes: 0,
                });
                newPlaylist.save((err) => {
                    if (err) {
                        apiResponse.errorResponse(
                            res,
                            "Playlist cannot be created"
                        );
                    } else {
                        apiResponse.successResponse(
                            res,
                            "Playlist created successfuly"
                        );
                    }
                });
            }
        });
    }),
];

const getMusicPlaylistById = [
    catchAsync(async (req, res) => {
        MusicPlaylists.findOne(
            { _id: req.params.playlist },
            (err, playlist) => {
                if (err) {
                    apiResponse.errorResponse(
                        res,
                        "Error! Menu couldn't be found"
                    );
                } else {
                    if (playlist) {
                        apiResponse.notFoundResponse(res, "Menu doesn't exist");
                    } else {
                        apiResponse.successResponseWithData(
                            res,
                            "Menu found",
                            playlist
                        );
                    }
                }
            }
        );
    }),
];

const getMusicPlaylistsByUserId = [
    catchAsync(async (req, res) => {
        MusicPlaylists.find(
            { createdBy: req.params.userId },
            (err, playlist) => {
                if (err) {
                    apiResponse.notFoundResponse(
                        res,
                        "Error! Playlists couldn't be found"
                    );
                } else {
                    if (!playlist) {
                        apiResponse.notFoundResponse(
                            res,
                            "This user doesn't have any custom music playlist"
                        );
                    } else {
                        apiResponse.successResponseWithData(
                            res,
                            "Music playlist found",
                            playlist
                        );
                    }
                }
            }
        );
    }),
];

const updateCustomMusicPlaylist = [
    catchAsync(async (req, res) => {
        MusicPlaylists.findOneAndUpdate(
            { _id: req.params.playlist },
            (err, menu) => {
                if (err) {
                    apiResponse.errorResponse(
                        res,
                        "Error! Food menu couldn't be updated"
                    );
                } else {
                    if (!menu) {
                        apiResponse.notFoundResponse(
                            res,
                            "No menus with id found"
                        );
                    } else {
                        apiResponse.successResponse(
                            res,
                            "Food menu updated successfuly"
                        );
                    }
                }
            }
        );
    }),
];

const removeCustomMusicPlaylist = [
    catchAsync(async (req, res) => {
        MusicPlaylists.findOneAndDelete(
            {
                _id: req.params.menuId,
            },
            (err, doc) => {
                if (err) {
                    apiResponse.errorResponse(
                        res,
                        "Error! Playlist couldn't be deleted"
                    );
                } else {
                    if (!doc) {
                        apiResponse.notFoundResponse(
                            res,
                            "No music playlist with id found"
                        );
                    } else {
                        apiResponse.successResponse(
                            res,
                            "Playlist deleted successfuly"
                        );
                    }
                }
            }
        );
    }),
];

module.exports = {
    createCustomMusicPlaylist,
    getMusicPlaylistById,
    getMusicPlaylistsByUserId,
    updateCustomMusicPlaylist,
    removeCustomMusicPlaylist,
};
