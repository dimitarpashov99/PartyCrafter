const User = require("../models/user");
const Address = require("../models/address");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");

const getAddressById = async (userId, addressId) => {
    return await User.findById(userId, "addressbook", (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            const address = doc.find((addressBookAddress) => {
                return addressBookAddress._id === addressId;
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
    const userAddressBook = await User.findById(userId, (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            if (!doc) {
                throw new ApiError(StatusCodes.NOT_FOUND, err.message);
            }
            return doc.addressBook;
        }
    });
    const newAddress = new Address(data);
    userAddressBook.push(newAddress);
    await userAddressBook.save();
    return userAddressBook;
};

const updateAddress = async (userId, addressId, data) => {
    const userAddressBook = User.findById(userId, "addressbook", (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            return doc;
        }
    });
    const address = userAddressBook.id(addressId);
    await userAddressBook.save();
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
