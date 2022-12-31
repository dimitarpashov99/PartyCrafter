import axios from "axios";

const API_URL = "http://localhost:3001/api/user";

const getAllCustomMenus = () => {
    return axios.get(API_URL + "/custom/menus");
};

const getCustomMenuById = (id) => {
    return axios.get(API_URL, {
        params: {
            menuId: id,
        },
    });
};

const createCustomMenu = (menuData) => {
    return axios.post(API_URL + "/custom/menus", menuData);
};

const updateCustomMenu = (menuData) => {
    return axios.put(API_URL + "/custom/menus", menuData);
};

const deleteCustomMenu = (menuId) => {
    return axios.delete(API_URL + "/custom/menus", {
        params: { menuId: menuId },
    });
};

export {
    getAllCustomMenus,
    getCustomMenuById,
    createCustomMenu,
    updateCustomMenu,
    deleteCustomMenu,
};
