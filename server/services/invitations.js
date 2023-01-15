const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/APIError");
const Invitation = require("../models/invitation");

const getInvitations = async (userId) => {
    const invitations = await Invitation.find({ guestId: userId });
    if (!invitations) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitations;
};

const getInvitationById = async (inviteId) => {
    const invitation = await Invitation.findOneById(inviteId);
    if (!invitation) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitation;
};

const findInvitationByGuestName = async (eventCode, guestName) => {
    const invitation = await Invitation.findOne({
        eventCode: eventCode,
        guestName: guestName,
    });
    if (!invitation) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitation;
};

const findInvitationByGuestEmail = async (eventCode, guestEmail) => {
    const invitation = await Invitation.findOne({
        eventCode: eventCode,
        guestEmail: guestEmail,
    });
    if (!invitation) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitation;
};

const findInvitationByGuestPhone = async (eventCode, guestPhone) => {
    const invitation = await Invitation.findOne({
        eventCode: eventCode,
        guestPhone: guestPhone,
    });
    if (!invitation) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitation;
};

const createInvitation = async (eventCode, guestData) => {
    const newInvitation = new Invitation({
        eventCode: eventCode,
        ...guestData,
    });
    await newInvitation.save();
    return { success: true };
};

const updateInvitation = async (eventCode, guestData) => {
    const newInvitation = new Invitation({
        eventCode: eventCode,
        ...guestData,
    });
    await newInvitation.save();
    return { success: true };
};

const removeInvitation = async (invitationId) => {
    const invitation = await Invitation.findByIdAndDelete(invitationId)
    if (!invitation) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return { success: true };
};
module.exports = {
    getInvitations,
    getInvitationById,
    findInvitationByGuestName,
    findInvitationByGuestEmail,
    findInvitationByGuestPhone,
    createInvitation,
    updateInvitation,
    removeInvitation,
};
