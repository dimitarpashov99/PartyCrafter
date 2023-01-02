const Event = require("../models/partyEvent");

const catchAsync = require("../utils/catchAsync");
const partyEventsService = require("../services/party-events");

const getById = [
    catchAsync(async (req, res, next) => {
        var requestedId = req.params.id;
        const result = await partyEventsService.getById(requestedId);
        res.json(result);
    }),
];

const getByCode = [
    catchAsync(async (req, res) => {
        const code = req.params?.code;
        const result = await partyEventsService.getByCode(code);
        res.json(result);
    }),
];

const create = [
    catchAsync(async (req, res) => {
        const data = req.body?.partyEventData;
        const result = await partyEventsService.create(data, req.currentUser);
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const id = req.body.id;
        const result = await partyEventsService.deleteEvent(id);
        res.json(result);
    }),
];

const changePreferance = [
    catchAsync(async (req, res) => {
        Event.updateOne(
            {
                _id: req.body.id,
            },
            { $set: { preferences: req.body.eventPreferences } },
            (err, doc) => {
                if (!err) {
                    res.json(doc.toJson());
                }
            }
        );
    }),
];

const join = [
    catchAsync(async (req, res) => {
        const user = req.currentUser;
        const eventCode = req.body?.code;
        const event = await partyEventsService.getByCode(eventCode);
    }),
];
module.exports = {
    getById,
    getByCode,
    create,
    remove,
    changePreferance,
    join,
};
