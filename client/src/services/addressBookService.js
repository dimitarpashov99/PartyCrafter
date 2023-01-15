import { apiCall } from "./utils";

const uri = "addressBook";

const getAddressBook = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().get(service);
};

const addAddressToAddressBook = (menuId) => {
    const service = `${uri}/${menuId}`;
    return apiCall().get(service);
};

const getAddressFromAddressBook = (menuId, data) => {
    const service = `${uri}/${menuId}`;
    return apiCall().get(service, data);
};

const updateAddressFromAddressBook = (menuId, data) => {
    const service = `${uri}/${menuId}`;
    return apiCall().put(service, data);
};

const removeAddressFromAddressBook = (menuId) => {
    const service = `${uri}/${menuId}`;
    return apiCall().delete(service);
};

export {
    getAddressBook,
    addAddressToAddressBook,
    getAddressFromAddressBook,
    updateAddressFromAddressBook,
    removeAddressFromAddressBook,
};
