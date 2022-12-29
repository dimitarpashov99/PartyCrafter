const Event = require("../models/partyEvent");

const catchAsync = require("../utils/catchAsync");
const partyEventsService = require('../services/party-events')

const getById = [
    catchAsync(async (req, res, next) => {
        var requestedId = req.params.id;
        let partyEvent = Event.find({
            _id: requestedId,
        });

        res.status(200);
        res.json({
            partyEvent: partyEvent,
        });
        return next();
    }),
];

const getByCode = [
    catchAsync(async (req, res, next) => {
        Event.findOne({
            _code: req.params.eventCode,
        })
            .lean()
            .then((doc) => {
                if (!doc) {
                    apiResponse.notFoundResponse(
                        res,
                        "Event with " + req.params.eventCode + " code not found"
                    );
                } else {
                    apiResponse.successResponseWithData(
                        res,
                        "Event found",
                        doc
                    );
                }
            });

        return next();
    }),
];

const create = [
    catchAsync(async (req, res) => {
            const data = req.body?.partyEventData;
            
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        Event.findAndRemove({ _id: req.param.id }, (err) => {
            if (err) {
                apiResponse.errorResponse(res, "Event couldn't be removed");
            } else {
                apiResponse.successResponse(res, "Event removed successfuly");
            }
        });
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

module.exports = {
    getById,
    getByCode,
    create,
    remove,
    changePreferance,
};
