const { StatusCodes } = require("http-status-codes");
const PartyEvent = require("../models/partyEvent");
const ApiError = require("../utils/APIError");
const crypto = require("crypto");
const Invitation = require("../models/invitation");

const create = async (data, host) => {
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

const getById = async (id) => {
    const event = await PartyEvent.findById(id);
    if (!event) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Party event doesn't exist");
    }
    return event;
};

const getByCode = async (code) => {
    const event = await PartyEvent.findOne({ code: code });
    if (!event) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Party event doesn't exist");
    }
    return event;
};

const getAsQuery = async (filter, options) => {
    return await PartyEvent.find(filter, options);
};

const getPublicEvents = async () => {
    return await PartyEvent.find({ privateAccess: true }).limit(10);
};

const updateEvent = async (id, data) => {
    return await PartyEvent.findByIdAndUpdate(id, { $set: data });
};

const deleteEvent = async (id) => {
    const result = await PartyEvent.findByIdAndRemove(id);
    if (!result) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Party event cannot be deleted"
        );
    }
    return result;
};

const joinEvent = async (code, guestId) => {
    const event = await PartyEvent.findOne({ code: code });
    const guestIndex = event.guestList.findIndex((guest) => {
        return guestId === guest.id;
    });
    if (!guestIndex) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Guest Not found");
    }
    const guest = event.guestList[guestIndex];
    if (guest) {
        event.guestList[guestIndex] = { ...guest, status: "joined" };
        await Invitation.findOneAndUpdate(
            { guestId: guestId },
            { status: "accepted" }
        );
    }
    await event.save();
    return event;
};

module.exports = {
    create,
    getById,
    getAsQuery,
    getPublicEvents,
    getByCode,
    updateEvent,
    deleteEvent,
    joinEvent,
};
