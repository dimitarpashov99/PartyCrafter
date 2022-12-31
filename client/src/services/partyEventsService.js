import { apiCall } from "./utils";

const searchEventByCode = async (eventCode) => {
    const uri = "events/" + eventCode;
    return await apiCall().get(uri);
};

const getOpenPartyEvents = async (location) => {
    return await apiCall().get("events/public", {
        params: {
            location: location,
        },
    });
};

const createPartyEvent = async (partyEventData) => {
    return await apiCall().post("events", {
        partyEventData: partyEventData,
    });
};

const updatePartyEvent = async (eventCode, partyEventData) => {
    return await apiCall().put("events", {
        params: {
            code: eventCode,
        },
        partyEventData: partyEventData,
    });
};

const cancelPartyEvent = async (eventCode) => {
    return await apiCall().put("events", {
        params: {
            code: eventCode,
        },
    });
};

const deletePartyEvent = async (eventCode) => {
    return await apiCall().delete("events", {
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
