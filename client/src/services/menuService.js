import { apiCall } from "./utils";

const getAllCustomMenus = () => {
    return apiCall().get("/custom/menus");
};

const getCustomMenuById = (menuId) => {
    return apiCall().get("/custom/menus/" + menuId);
};

const createCustomMenu = (menuData) => {
    return apiCall().post("/custom/menus", menuData);
};

const updateCustomMenu = (menuId, menuData) => {
    return apiCall().put("/custom/menus/" + menuId, menuData);
};

const deleteCustomMenu = (menuId) => {
    return apiCall().get("/custom/menus" + menuId);
};

export {
    getAllCustomMenus,
    getCustomMenuById,
    createCustomMenu,
    updateCustomMenu,
    deleteCustomMenu,
};
