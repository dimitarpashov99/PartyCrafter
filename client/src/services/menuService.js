import { apiCall } from "./utils";

const uri = "menus";

const getAllCustomMenus = (userId) => {
    const filter = { userId: userId };
    const service = `${uri}`;
    return apiCall().get(service, {
        params: {
            filter: filter,
        },
    });
};

const createCustomMenu = (data) => {
    const service = `${uri}`;
    return apiCall().post(service, data);
};

const getCustomMenuById = (menuId) => {
    const service = `${uri}/${menuId}`;
    return apiCall().get(service);
};

const updateCustomMenu = (menuId, data) => {
    const service = `${uri}/${menuId}`;
    return apiCall().put(service, data);
};

const deleteCustomMenu = (menuId) => {
    const service = `${uri}/${menuId}`;
    return apiCall().delete(service);
};

export {
    getAllCustomMenus,
    getCustomMenuById,
    createCustomMenu,
    updateCustomMenu,
    deleteCustomMenu,
};
