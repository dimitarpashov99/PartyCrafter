const catchAsync = require("../utils/catchAsync");
const partyEventsService = require("../services/party-events");

const getAll = [
    catchAsync(async (req, res) => {
        const filterEvents = req.query.filter;
        const result = await partyEventsService.getPartyEventsAsQuery(
            filterEvents
        );
        res.json(result);
    }),
];

const getById = [
    catchAsync(async (req, res) => {
        const partyEventId = req.params.id;
        const result = await partyEventsService.getPartyEventById(partyEventId);
        res.json(result);
    }),
];

const create = [
    catchAsync(async (req, res) => {
        const data = req.body?.partyEventData;
        const result = await partyEventsService.createPartyEvent(
            data,
            req.currentUser
        );
        res.json(result);
    }),
];

const update = [
    catchAsync(async (req, res) => {
        const eventId = req.params.id;
        const data = req.body?.partyEventData;
        const result = await partyEventsService.updatePartyEvent(eventId, data);
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const id = req.body.id;
        const result = await partyEventsService.deletePartyEvent(id);
        res.json(result);
    }),
];

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};
