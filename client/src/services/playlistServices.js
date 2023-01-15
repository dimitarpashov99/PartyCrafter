import { apiCall } from "./utils";

const uri = "playlists";

const getAllCustomPlaylists = (userId) => {
    const filter = { userId: userId };
    const service = `${uri}`;
    return apiCall().get(service, {
        params: {
            filter: filter,
        },
    });
};

const getCustomPlaylistById = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().get(service);
};

const createCustomPlaylist = (data) => {
    const service = `${uri}`;
    return apiCall().post(service, data);
};

const updateCustomPlaylist = (id, data) => {
    const service = `${uri}/${id}`;
    return apiCall().put(service, data);
};

const deleteCustomPlaylist = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().delete(service);
};

export {
    getAllCustomPlaylists,
    getCustomPlaylistById,
    createCustomPlaylist,
    updateCustomPlaylist,
    deleteCustomPlaylist,
};
