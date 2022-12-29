const User = require("../models/user");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");

const getAddressById = async (userId, addressId) => {
    return await User.findOne({ _id: userId }, "addressbook", (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            const address = doc.find((addressBookAddress) => {
                return addressBookAddress.id === addressId;
            });
            if (!address) {
                throw new ApiError(StatusCodes.NOT_FOUND, err.message);
            }
            return { address: address };
        }
    });
};

const getAddressBook = async (userId) => {
    return await User.findOne({ _id: userId }, "addressbook", (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            return doc;
        }
    });
};

const createAddress = async (userId, data) => {
    const userAddressBook = await getAddressBook(userId);
    return userAddressBook;
};

const updateAddress = async (userId, addressId, data) => {
    const userAddressBook = await getAddressBook(userId);
    return userAddressBook;
};
const deleteAddress = async (userId, addressId) => {
    const userAddressBook = await getAddressBook(userId);
    return userAddressBook;
};
module.exports = {
    getAddressById,
    getAddressBook,
    createAddress,
    updateAddress,
    deleteAddress,
};
