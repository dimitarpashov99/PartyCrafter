const { StatusCodes } = require("http-status-codes");
const PartyEvent = require("../models/partyEvent");
const ApiError = require("../utils/APIError");

const create = async (data) => {
    const eventCode = crypto.randomBytes(7).toString("hex");
    const newEvent = new PartyEvent({
        title: data.title,
        description: data.description,
        address: data.address,
        type: data?.partyType || "default",
        hostId: "testId",
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

const getById = () => {};

const getAllAsQuery = () => {};

const update = () => {};

const remove = () => {};

module.exports = {
    create,
    getById,
    getAllAsQuery,
    update,
    remove,
};
