import { apiCall } from "./utils";

const uri = "addressbooks";

const getAddressBook = (userId) => {
    const service = `${uri}`;
    const filter = { userId: userId };
    return apiCall().get(service, { params: { filter: filter } });
};

const addAddressToAddressBook = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().get(service);
};

const getAddressFromAddressBook = (id, data) => {
    const service = `${uri}/${id}`;
    return apiCall().get(service, data);
};

const updateAddressFromAddressBook = (id, data) => {
    const service = `${uri}/${id}`;
    return apiCall().put(service, data);
};

const removeAddressFromAddressBook = (id) => {
    const service = `${uri}/${id}`;
    return apiCall().delete(service);
};

export {
    getAddressBook,
    addAddressToAddressBook,
    getAddressFromAddressBook,
    updateAddressFromAddressBook,
    removeAddressFromAddressBook,
};
