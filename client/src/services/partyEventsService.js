import { apiCall } from "./utils";

const uri = "events";

const getEvent = async (eventId) => {
    const service = `${uri}/${eventId}`;
    return await apiCall().get(service);
};

const getOpenPartyEvents = async (city) => {
    const filter = { "address.city": city, privateAccess: false };
    const service = `${uri}`;
    return await apiCall().get(service, {
        params: {
            filter: filter,
        },
    });
};

const createPartyEvent = async (partyEventData) => {
    const service = `${uri}`;
    return await apiCall().post(service, {
        partyEventData: partyEventData,
    });
};

const updatePartyEvent = async (id, partyEventData) => {
    const service = `${uri}/${id}`;
    return await apiCall().put(service, {
        partyEventData: partyEventData,
    });
};

const deletePartyEvent = async (id) => {
    const service = `${uri}/${id}`;
    return await apiCall().delete(service);
};

const getTopPublicEvents = async (city) => {
    const service = `${uri}`;
    return await apiCall().get(service, { params: { city: city } });
};

const getUserEvents = async (userId) => {
    const service = `${uri}`;
    const filter = { hostId: userId };
    return await apiCall().get(service, { params: { filter: filter } });
};
export default {
    getEvent,
    getOpenPartyEvents,
    createPartyEvent,
    updatePartyEvent,
    deletePartyEvent,
    getTopPublicEvents,
    getUserEvents,
};
