import { apiCall } from "./utils";

const serviceURL = "/custom/playlists";

const getAllCustomPlaylists = () => {
    return apiCall().get(serviceURL);
};

const getCustomPlaylistById = (menuId) => {
    return apiCall().get(serviceURL + "/" + menuId);
};

const createCustomPlaylist = (menuData) => {
    return apiCall().post(serviceURL, menuData);
};

const updateCustomPlaylist = (menuId, menuData) => {
    return apiCall().put("/custom/playlists/" + menuId, menuData);
};

const deleteCustomPlaylist = (menuId) => {
    return apiCall().delete(serviceURL + menuId);
};

export {
    getAllCustomPlaylists,
    getCustomPlaylistById,
    createCustomPlaylist,
    updateCustomPlaylist,
    deleteCustomPlaylist,
};
