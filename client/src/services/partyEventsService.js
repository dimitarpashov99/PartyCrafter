import { apiCall } from "./utils";
const searchEventByCode = (eventCode) => {
    return apiCall().get("events", {
        params: {
            code: eventCode,
        },
    });
};

const getOpenPartyEvents = (location) => {
    return apiCall().get("events/public", {
        params: {
            location: location,
        },
    });
};

const createPartyEvent = (partyEventData) => {
    return apiCall().post("events", {
        partyEventData: partyEventData,
    });
};

const updatePartyEvent = (eventCode, partyEventData) => {
    return apiCall().put("events", {
        params: {
            code: eventCode,
        },
        partyEventData: partyEventData,
    });
};

const cancelPartyEvent = (eventCode) => {
    return apiCall().put("events", {
        params: {
            code: eventCode,
        },
    });
};

const deletePartyEvent = (eventCode) => {
    return apiCall().delete("events", {
        params: {
            code: eventCode,
        },
    });
};

const sendMusicRequest = (user) => {};

export {
    searchEventByCode,
    getOpenPartyEvents,
    createPartyEvent,
    updatePartyEvent,
    cancelPartyEvent,
    deletePartyEvent,
    sendMusicRequest,
};
