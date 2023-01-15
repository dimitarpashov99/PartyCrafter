const catchAsync = require("../utils/catchAsync");
const partyEventsService = require("../services/party-events");

const getById = [
    catchAsync(async (req, res) => {
        var partyEventId = req.params.id;
        const result = await partyEventsService.getById(requestedId);
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

const update = [
    catchAsync(async (req, res) => {
        const eventId = req.params.id;
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

module.exports = {
    getById,
    create,
    remove,
    update,
    
};
