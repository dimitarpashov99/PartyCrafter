import { apiCall } from "./utils";

const uri = "invitations";

const getAllPartyInvitationsForUser = (userId) => {
    const service = `${uri}`;
    return apiCall().get(service, {
        params: {
            filter: { guestId: userId },
        },
    });
};

const getPartyInvitation = (inviteId) => {
    const service = `${uri}/${inviteId}`;
    return apiCall().get(service);
};

const getGuestInvitationByName = (eventId, guestName) => {
    const service = `${uri}`;
    return apiCall()
        .get(service, {
            params: {
                filter: {
                    eventId: eventId,
                    guestName: guestName,
                },
            },
        })
        .then((response) => {
            return { eventId: response.data[0].eventId };
        })
        .catch(() => {
            return {
                error: true,
                title: "Invitation for this guest not found",
            };
        });
};

const getGuestInvitationByEmail = (eventId, guestEmail) => {
    const service = `${uri}`;
    return apiCall()
        .get(service, {
            params: {
                filter: {
                    eventId: eventId,
                    guestEmail: guestEmail,
                },
            },
        })
        .then((response) => {
            return response.eventId;
        })
        .catch(() => {
            return {
                error: true,
                title: "Invitation for this guest not found",
            };
        });
};

const getGuestInvitationByPhone = (eventId, guestPhone) => {
    const service = `${uri}`;
    return apiCall()
        .get(service, {
            params: {
                filter: {
                    eventId: eventId,
                    guestPhone: guestPhone,
                },
            },
        })
        .then((response) => {
            return response.eventId;
        })
        .catch(() => {
            return {
                error: true,
                title: "Invitation for this guest not found",
            };
        });
};
export default {
    getAllPartyInvitationsForUser,
    getPartyInvitation,
    getGuestInvitationByName,
    getGuestInvitationByEmail,
    getGuestInvitationByPhone,
};
