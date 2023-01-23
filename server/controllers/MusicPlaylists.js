const catchAsync = require("../utils/catchAsync");
const musicPlaylistsService = require("../services/playlists");

const create = [
    catchAsync(async (req, res) => {
        const data = req.body?.musicPlaylistData;
        const result = await musicPlaylistsService.create(data);
        res.json(result);
    }),
];

const getById = [
    catchAsync(async (req, res) => {
        const playlistId = req.params?.id;
        const result = await musicPlaylistsService.getPlaylistById(playlistId);
        res.json(result);
    }),
];

const getAll = [
    catchAsync(async (req, res) => {
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const result = await musicPlaylistsService.getAllMusicPlaylistsAsQuery(
            filter
        );
        res.json(result);
    }),
];

const update = [
    catchAsync(async (req, res) => {
        const playlistId = req.params.id;
        const data = req.body.playlistData;
        const result = await musicPlaylistsService.updateMusicPlaylist(
            playlistId,
            data
        );
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const playlistId = req.params.id;
        const result = await musicPlaylistsService.deleteMusicPlaylist(
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
