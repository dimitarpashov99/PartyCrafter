const Event = require("../models/partyEvent");

const apiResponse = require("../helpers/apiResponse");

function getById(req, res, next) {
    var requestedId = req.params.id;
    let partyEvent = Event.find({
        _id: requestedId,
    });

    res.status(200);
    res.json({
        partyEvent: partyEvent,
    });
    return next();
}

function getByCode(req, res, next) {
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
                apiResponse.successResponseWithData(res, "Event found", doc);
            }
        });

    return next();
}

function create(req, res) {
    const data = req.body?.partyEventData;
    if (data) {
        const newEvent = new Event({
            title: data.eventTitle,
            description: data.eventDescription,
            address: data.eventAddress,
            type: data?.partyType || 'default',
            privateAccess: data.privateEvent,
            date: data.eventDate,
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
            code: crypto.randomBytes(7).toString("hex").toUpperCase(),
        });
        newEvent
            .create()
            .then(() => {
                apiResponse.successResponse(res, "Event created successfuly");
            })
            .catch(() => {
                apiResponse.errorResponse(res, "Event couldn't be created");
            });
    } else {
        apiResponse.errorResponse(res, JSON.stringify(req.body));
    }
}

function remove(req, res, next) {
    Event.findAndRemove({ _id: req.param.id });
    return next();
}

function changePreferance(req, res, next) {
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
    return next();
}

module.exports = {
    getById,
    getByCode,
    create,
    remove,
    changePreferance,
};
