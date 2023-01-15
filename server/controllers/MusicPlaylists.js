const catchAsync = require("../utils/catchAsync");
const musitPlaylistsService = require("../services/playlists");

const create = [
    catchAsync(async (req, res) => {
        const data = req.body?.musicPlaylistData;
        const result = await musitPlaylistsService.create(data);
        res.json(result);
    }),
];

const getById = [
    catchAsync(async (req, res) => {
        const playlistId = req.params?.id;
        const result = await musitPlaylistsService.getPlaylistById(playlistId);
        res.json(result);
    }),
];

const getAll = [
    catchAsync(async (req, res) => {
        const filter = req.query.filter;
        const result = await musitPlaylistsService.getAllMusicPlaylistsAsQuery(
            filter
        );
        res.json(result);
    }),
];

const update = [
    catchAsync(async (req, res) => {
        const playlistId = req.params.id;
        const data = req.body.playlistData;
        const result = await musitPlaylistsService.updateMusicPlaylist(
            playlistId,
            data
        );
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const playlistId = req.params.id;
        const result = await musitPlaylistsService.deleteMusicPlaylist(
            playlistId
        );
        res.json(result);
    }),
];

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove,
};
