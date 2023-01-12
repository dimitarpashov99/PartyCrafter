import { apiCall } from "./utils";

const serviceURL = "/account";

const getAllUserPartyInvitations = () => {
    const service = serviceURL + "/invitations";
    return apiCall().get(service);
};

const getUserPartyInvitation = (inviteId) => {
    const service = serviceURL + "/invitations";
    return apiCall().get(service, {
        params: {
            id: inviteId,
        },
    });
};

const changePassword = async (formData) => {
    const service = serviceURL + "/changepassword";
    return await apiCall().post(service, formData);
};

export default { getAllUserPartyInvitations, getUserPartyInvitation, changePassword };
