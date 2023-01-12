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

const getInvitation = async (inviteId) => {
    const invitations = await Invitation.findOneById(inviteId);
    if (!invitations) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitations;
};

const getInvitationsByGuestName = async (guestName) => {
    const invitations = await Invitation.find({ guestName: guestName });
    if (!invitations) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitations;
};

const getInvitationsByGuestEmail = async (guestEmail) => {
    const invitations = await Invitation.find({ guestEmail: guestEmail });
    if (!invitations) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitations;
};

const getInvitationsByGuestPhone = async (guestPhone) => {
    const invitations = await Invitation.find({ guestPhone: guestPhone });
    if (!invitations) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No invitations found for user"
        );
    }
    return invitations;
};

module.exports = {
    getInvitations,
    getInvitation,
    getInvitationsByGuestName,
    getInvitationsByGuestEmail,
    getInvitationsByGuestPhone,
};
