const Event = require("../models/partyEvent");

const catchAsync = require("../utils/catchAsync");
const partyEventsService = require("../services/party-events");
const invitationsService = require("../services/invitations");
const authService = require("../services/authentication");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");

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
        const eventCode = req.body?.eventCode;
        const guestIdentifier = req.body?.guestIdentifier;
        const guestIdentifierType = req.body?.guestIdentifierType;
        let invite;
        switch (guestIdentifierType) {
            case "name":
                invite = await invitationsService.findInvitationByGuestName(
                    eventCode,
                    guestIdentifier
                );
                break;
            case "email":
                invite = await invitationsService.findInvitationByGuestEmail(
                    eventCode,
                    guestIdentifier
                );
                break;
            case "phone":
                invite = await invitationsService.findInvitationByGuestPhone(
                    eventCode,
                    guestIdentifier
                );
                break;
            default:
                throw new ApiError(
                    StatusCodes.BAD_REQUEST,
                    "Identifier must be provided"
                );
        }
        if (!invite) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Invitation not found for this event"
            );
        }
        const event = await partyEventsService.joinEvent(
            eventCode,
            invite.guestId
        );
        const result = {
            success: true,
            eventCode: event.code,
        };
        if (!req.currentUser) {
            const token = authService.generateGuestToken(
                eventCode,
                invite.guestId
            );
            result.accessToken = token;
        }

        res.json(result);
    }),
];

const rateEvent = [
    catchAsync(async (req, res) => {
        const userId = req.isGuest ? req.currentUser : req.currentUser.id;
        const eventCode = req.body?.eventCode;
        const rate = req.body?.rate;
        const result = await partyEventsService.rateEvent(
            userId,
            eventCode,
            rate
        );
        if (!result) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, null);
        }
        res.json({ success: true });
    }),
];

module.exports = {
    getById,
    getByCode,
    create,
    remove,
    changePreferance,
    join,
    rateEvent,
};
