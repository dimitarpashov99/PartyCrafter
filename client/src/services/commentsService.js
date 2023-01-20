import { apiCall } from "./utils";

const uri = "comments";

const getAllCommentsForEvent = (eventId) => {
    const filter = { eventId: eventId };
    const service = `${uri}`;
    return apiCall().get(service, {
        params: {
            filter: filter,
        },
    });
};

const getAllCommentsForUser = (userId) => {
    const service = `${uri}`;
    const filter = { userId: userId };

    return apiCall().post(service, {
        params: {
            filter: filter,
        },
    });
};

const createComment = (data) => {
    const service = `${uri}`;
    return apiCall().post(service);
};

const getComment = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().get(service);
};

const updateComment = (id, data) => {
    const service = `${uri}/${id}`;
    return apiCall().put(service, data);
};

const deleteComment = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().delete(service);
};

export {
    getAllCommentsForEvent,
    getAllCommentsForUser,
    getComment,
    createComment,
    updateComment,
    deleteComment,
};
