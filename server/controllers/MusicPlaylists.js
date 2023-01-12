const catchAsync = require("../utils/catchAsync");
const musitPlaylistsService = require("../services/playlists");
const createCustomMusicPlaylist = [
    catchAsync(async (req, res) => {
        const data = req.body?.musicPlaylistData;
        const result = await musitPlaylistsService.create(
            req.currentUser?.id,
            data
        );
        res.json(result);
    }),
];

const getMusicPlaylistById = [
    catchAsync(async (req, res) => {
        const playlistId = req.params?.id;
        const result = await musitPlaylistsService.getById(playlistId);
        res.json(result);
        // MusicPlaylists.findOne(
        //     { _id: req.params.playlist },
        //     (err, playlist) => {
        //         if (err) {
        //             apiResponse.errorResponse(
        //                 res,
        //                 "Error! Menu couldn't be found"
        //             );
        //         } else {
        //             if (playlist) {
        //                 apiResponse.notFoundResponse(res, "Menu doesn't exist");
        //             } else {
        //                 apiResponse.successResponseWithData(
        //                     res,
        //                     "Menu found",
        //                     playlist
        //                 );
        //             }
        //         }
        //     }
        // );
    }),
];

const getMusicPlaylistsByUserId = [
    catchAsync(async (req, res) => {
        const result = await musitPlaylistsService.getAllCustomPlaylists(
            req.currentUser.id
        );
        res.json(result);
    }),
];

const updateCustomMusicPlaylist = [
    catchAsync(async (req, res) => {
        const playlistId = req.params.id;
        const data = req.body.playlistData;
        const result = await musitPlaylistsService.updateCustomPlaylist(
            playlistId,
            data
        );
        res.json(result);
        // MusicPlaylists.findOneAndUpdate(
        //     { _id: req.params.playlist },
        //     (err, menu) => {
        //         if (err) {
        //             apiResponse.errorResponse(
        //                 res,
        //                 "Error! Food menu couldn't be updated"
        //             );
        //         } else {
        //             if (!menu) {
        //                 apiResponse.notFoundResponse(
        //                     res,
        //                     "No menus with id found"
        //                 );
        //             } else {
        //                 apiResponse.successResponse(
        //                     res,
        //                     "Food menu updated successfuly"
        //                 );
        //             }
        //         }
        //     }
        // );
    }),
];

const removeCustomMusicPlaylist = [
    catchAsync(async (req, res) => {
        const playlistId = req.params.id;
        const result = await musitPlaylistsService.removeCustomMusicPlaylist(
            playlistId
        );
        res.json(result);
        // MusicPlaylists.findOneAndDelete(
        //     {
        //         _id: req.params.menuId,
        //     },
        //     (err, doc) => {
        //         if (err) {
        //             apiResponse.errorResponse(
        //                 res,
        //                 "Error! Playlist couldn't be deleted"
        //             );
        //         } else {
        //             if (!doc) {
        //                 apiResponse.notFoundResponse(
        //                     res,
        //                     "No music playlist with id found"
        //                 );
        //             } else {
        //                 apiResponse.successResponse(
        //                     res,
        //                     "Playlist deleted successfuly"
        //                 );
        //             }
        //         }
        //     }
        // );
    }),
];

module.exports = {
    createCustomMusicPlaylist,
    getMusicPlaylistById,
    getMusicPlaylistsByUserId,
    updateCustomMusicPlaylist,
    removeCustomMusicPlaylist,
};
