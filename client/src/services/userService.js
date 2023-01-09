import { apiCall } from "./utils";

const serviceURL = "/profile";

const getAllUserPartyInvitations = () => {
    const service = serviceURL + "/invitations";
    return apiCall().get(service);
};

const getUserPartyInvitation = (inviteId) => {
    const service = serviceURL + "/invitation";
    return apiCall().get(service, {
        params: {
            id: inviteId,
        },
    });
};

export { getAllUserPartyInvitations, getUserPartyInvitation };
