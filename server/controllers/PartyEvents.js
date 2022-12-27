const Event = require("../models/partyEvent");

const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

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
        try {
            const data = req.body?.partyEventData;

            const newEvent = new Event({
                title: data.eventTitle,
                description: data.eventDescription,
                address: data.eventAddress,
                type: data?.partyType || "default",
                hostId: "testId",
                privateAccess: data.privateEvent,
                date: new Date(data.eventDate),
                preferences: {
                    musicPreference: data.preferences.musicPreference,
                    foodPreference: data.preferences.foodPreference,
                    allowRequests: data.preferences.allowRequests,
                    allowPhotoUploads: data.preferences.allowPhotoUploads,
                    allowChat: data.preferences.allowChat,
                    allowGuestInvites: data.preferences.allowGuestInvites,
                    assignGuestTables: data.preferences.assignGuestTables,
                },
                musicPlaylist: data.chosenPlaylist,
                foodMenu: data.chosenFoodMenu,
                tableCount: data.tableCount,
                guestList: data.guestList,
                code: "002", // crypto.randomBytes(7).toString("hex"),
            });

            newEvent.save((err) => {
                if (err) {
                    console.log(err);
                    apiResponse.errorResponse(res, "Event couldn't be created");
                } else {
                    apiResponse.successResponse(
                        res,
                        "Event created successfuly"
                    );
                }
            });
        } catch (e) {
            apiResponse.errorResponse(res, JSON.stringify(req.body));
        }
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
