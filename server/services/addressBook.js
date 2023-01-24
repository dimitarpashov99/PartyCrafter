const AddressBook = require("../models/addressbook");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");

const getAddressBooks = async (filter) => {
    const addressBooks = await AddressBook.find(filter);
    if (!addressBooks) {
        throw new ApiError(StatusCodes.NOT_FOUND, "AddressBook not found");
    }
    return addressBooks;
};

const getAddressBookById = async (id) => {
    return await AddressBook.findOneById(id, (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            return doc;
        }
    });
};

const updateAddressBook = async (id, data) => {
    return await AddressBook.findByIdAndUpdate(
        id,
        { $set: data },
        (err, doc) => {
            if (err) {
                throw new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    err.message
                );
            } else {
                return doc;
            }
        }
    );
};

const deleteAddressBook = async (id) => {
    return await AddressBook.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, err.message);
        } else {
            return doc;
        }
    });
};

const getAddressById = async (addressBookId, addressId) => {
    return await AddressBook.findById(addressBookId, (err, doc) => {
        if (err) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
        } else {
            if (!doc) {
                throw new ApiError(
                    StatusCodes.NOT_FOUND,
                    "Address Book not found"
                );
            }
            const address = doc.find((address) => {
                return address._id === addressId;
            });
            if (!address) {
                throw new ApiError(StatusCodes.NOT_FOUND, err.message);
            }
            return { address: address };
        }
    });
};

const createAddress = async (addressbookId, data) => {
    const userAddressBook = await AddressBook.findById(
        addressbookId,
        (err, doc) => {
            if (err) {
                throw new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    err.message
                );
            } else {
                if (!doc) {
                    throw new ApiError(StatusCodes.NOT_FOUND, "Address");
                }
                return doc.addressBook;
            }
        }
    );

    const newAddress = {
        name: data?.address1,
        address1: data?.address1,
        address2: data?.address2,
        city: data?.city,
        country: data?.country,
        location: { lng: data?.lng, lat: data?.lat },
    };

    userAddressBook.push(newAddress);
    await userAddressBook.save();
    return userAddressBook;
};

const updateAddress = async (addressbookId, addressId, data) => {
    const userAddressBook = await AddressBook.findById(
        addressbookId,
        (err, doc) => {
            if (err) {
                throw new ApiError(StatusCodes.BAD_REQUEST, err.message);
            } else {
                if (!doc) {
                    throw new ApiError(
                        StatusCodes.NOT_FOUND,
                        "Address book not found"
                    );
                }
                const address = doc.addresses.id(addressId);
                if (!doc) {
                    throw new ApiError(
                        StatusCodes.NOT_FOUND,
                        "Address not found"
                    );
                }
                address.set(data);
                return doc.save();
            }
        }
    );
    return userAddressBook;
};

const deleteAddress = async (addressbookId, addressId) => {
    const userAddressBook = await AddressBook.findById(
        addressbookId,
        (err, doc) => {
            if (err) {
                throw new ApiError(StatusCodes.NOT_FOUND, err.message);
            } else {
                const address = doc.addresses.id(addressId);
                if (!address) {
                    throw new ApiError(StatusCodes.NOT_FOUND, err.message);
                }
                address.remove();
                return doc;
            }
        }
    );
    return userAddressBook;
};

module.exports = {
    getAddressBooks,
    getAddressBookById,
    updateAddressBook,
    deleteAddressBook,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
};
