const { StatusCodes } = require("http-status-codes");
const PartyEvent = require("../models/partyEvent");
const ApiError = require("../utils/APIError");
const crypto = require("crypto");
const Invitation = require("../models/invitation");

const createPartyEvent = async (data, host) => {
    const eventCode = crypto.randomBytes(7).toString("hex");
    const guestList = data.guestList?.map((guest) => {
        const guestInvitation = new Invitation({
            guestId: guest.id,
            eventCode: eventCode,
            guestName: guest.name,
            guestEmail: guest.email,
            guestPhone: guest.phone,
            createdOn: new Date(),
            status: "pending",
        });
        guestInvitation.save();
        return { ...guest, status: "invited" };
    });
    const newEvent = new PartyEvent({
        title: data.title,
        description: data.description,
        address: data.address,
        type: data?.partyType || "default",
        hostId: host.id,
        privateAccess: data.privateAccess,
        date: new Date(data.date),
        preferences: {
            music: data.preferences.music,
            foodMenu: data.preferences.foodMenu,
            allowRequests: data.preferences.allowRequests,
            allowPhotoUploads: data.preferences.allowPhotoUploads,
            allowChat: data.preferences.allowChat,
            allowGuestInvites: data.preferences.allowGuestInvites,
            assignGuestTables: data.preferences.assignGuestTables,
        },
        musicPlaylist: data.musicPlaylist,
        foodMenu: data.foodMenu,
        tableCount: data.tableCount,
        guestList: guestList,
        code: eventCode,
    });

    try {
        await newEvent.save();
        return { success: true, message: "Party Event created" };
    } catch (e) {
        throw new ApiError(
            StatusCodes.CONFLICT,
            "Party event cannot be created"
        );
    }
};

const getPartyEventById = async (id) => {
    const event = await PartyEvent.findById(id);
    if (!event) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Party event doesn't exist");
    }
    return event;
};

const getPartyEventsAsQuery = async (filter, options) => {
    return await PartyEvent.find(filter, options);
};

const updatePartyEvent = async (id, data) => {
    return await PartyEvent.findByIdAndUpdate(id, { $set: data });
};

const deletePartyEvent = async (id) => {
    const result = await PartyEvent.findByIdAndRemove(id);
    if (!result) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Party event cannot be deleted"
        );
    }
    return result;
};

// const joinEvent = async (code, guestId) => {
//     const event = await PartyEvent.findOne({ code: code });
//     const guestIndex = event.guestList.findIndex((guest) => {
//         return guestId === guest.id;
//     });
//     if (!guestIndex) {
//         throw new ApiError(StatusCodes.NOT_FOUND, "Guest Not found");
//     }
//     const guest = event.guestList[guestIndex];
//     if (guest) {
//         event.guestList[guestIndex] = { ...guest, status: "joined" };
//         await Invitation.findOneAndUpdate(
//             { guestId: guestId },
//             { status: "accepted" }
//         );
//     }
//     await event.save();
//     return event;
// };

// const rateEvent = async (guestId, eventCode, rate) => {
//     const event = await PartyEvent.findOne({ code: eventCode });
//     const validGuest = event.guestList.find((guest) => {
//         return guestId === guest.id;
//     });
//     if (!validGuest) {
//         throw new ApiError(StatusCodes.NOT_FOUND, "Guest Not found");
//     }
//     const currentRating = event.rating || 0;
//     const newRating = (currentRating + rate) / event.ratesCount + 1;
//     event.rating = newRating;
//     await event.save();
//     return event;
// };

module.exports = {
    createPartyEvent,
    getPartyEventById,
    getPartyEventsAsQuery,
    updatePartyEvent,
    deletePartyEvent,
};
