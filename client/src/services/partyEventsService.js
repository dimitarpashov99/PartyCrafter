import { apiCall } from "./utils";

const uri = "events";

const searchEventByCode = async (eventCode) => {
    const service = uri + eventCode;
    return await apiCall().get(service);
};

const getOpenPartyEvents = async (city) => {
    const service = `${uri}/public`;
    return await apiCall().get(service, {
        params: {
            city: city,
        },
    });
};

const createPartyEvent = async (partyEventData) => {
    const service = `${uri}`;
    return await apiCall().post(service, {
        partyEventData: partyEventData,
    });
};

const updatePartyEvent = async (eventCode, partyEventData) => {
    const service = `${uri}`;
    return await apiCall().put(service, {
        params: {
            code: eventCode,
        },
        partyEventData: partyEventData,
    });
};

const cancelPartyEvent = async (eventCode) => {
    const service = `${uri}`;
    return await apiCall().put(service, {
        params: {
            code: eventCode,
        },
    });
};

const deletePartyEvent = async (eventCode) => {
    const service = `${uri}`;
    return await apiCall().delete(service, {
        params: {
            code: eventCode,
        },
    });
};

const getTopPublicEvents = async (city) => {
    const service = `${uri}/topevents`;
    return await apiCall().get(service, { params: { city: city } });
};

const joinEvent = async (eventCode) => {
    const service = `${uri}/join`;
    return await apiCall().post(service, { eventCode: eventCode });
};

const sendRequest = async (eventCode, request) => {
    const service = `${uri}/${eventCode}/request"`;
    return await apiCall().post(service, {
        eventCode: eventCode,
        request: request,
    });
};

export default {
    searchEventByCode,
    getOpenPartyEvents,
    createPartyEvent,
    updatePartyEvent,
    cancelPartyEvent,
    deletePartyEvent,
    getTopPublicEvents,
    getPublicEvents,
    sendRequest,
    joinEvent,
};
