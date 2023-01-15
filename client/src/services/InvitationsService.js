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

const getUserPartyInvitation = (inviteId) => {
    const service = `${uri}`;
    return apiCall().get(service, {
        params: {
            id: inviteId,
        },
    });
};

export default {
    getAllPartyInvitationsForUser,
    getUserPartyInvitation
};
