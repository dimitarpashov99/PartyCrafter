import axios from "axios";
const API_URL = "http://localhost:3001/api/events";

const getPartyEventByCode = (eventCode) => {
    return axios.get(API_URL, {
        params: {
            code: eventCode,
        },
    });
};

const getOpenPartyEvents = (eventCode) => {
    return axios.get(API_URL, {
        params: {
            code: eventCode,
        },
    });
};

const createPartyEvent = (user, partyEventData) => {
    return axios.post(API_URL, {
        user: user,
        partyEventData: partyEventData,
    });
};

const updatePartyEvent = (eventCode, partyEventData) => {
    return axios.put(API_URL, {
        code: eventCode,
        partyEventData: partyEventData,
    });
};

const cancelPartyEvent = (eventCode) => {
    return axios.delete(API_URL, {
        params: {
            code: eventCode,
        },
    });
};

// const getSuggestedMusicPlaylists = (user) => {};



const sendMusicRequest = (user) => {

};

export {
    getPartyEventByCode,
    getOpenPartyEvents,
    createPartyEvent,
    updatePartyEvent,
    cancelPartyEvent,
    // getSuggestedMusicPlaylists,
    sendMusicRequest,
};
