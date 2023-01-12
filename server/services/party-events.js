const { StatusCodes } = require("http-status-codes");
const PartyEvent = require("../models/partyEvent");
const ApiError = require("../utils/APIError");
const crypto = require("crypto");

const create = async (data, host) => {
    const eventCode = crypto.randomBytes(7).toString("hex");
    const newEvent = new PartyEvent({
        title: data.title,
        description: data.description,
        address: data.address,
        type: data?.partyType || "default",
        hostId: host.id,
        privateAccess: data.privateEvent,
        date: new Date(data.startingDate),
        preferences: {
            music: data.preferences.music,
            foodMenu: data.preferences.foodMenu,
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

module.exports = {
    create,
    getById,
    getAsQuery,
    getPublicEvents,
    getByCode,
    updateEvent,
    deleteEvent,
};
