const catchAsync = require("../utils/catchAsync");

const userService = require("../services/users");
const addressService = require("../services/addressBook");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");

const get = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await userService.getUserById(userId);
    res.json({
        profile: result,
    });
});

// const create = catchAsync(async (req, res) => {
//     const userData = req.body.userData;
//     const result = await userService.c(userId);
//     res.json({
//         profile: result,
//     });
// });

const update = catchAsync(async (req, res) => {
    const userData = req.body.userData;
    const result = await userService.update(userId);
    res.json({
        profile: result,
    });
});

const getAddressBook = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await addressService.getAddressBook(userId);
    res.json({
        profile: result,
    });
});

const createAddress = catchAsync(async (req, res) => {
    const address = req.body.address;
    const result = await addressService.createAddress(address);
    return res.json(result);
});
const getAddressById = catchAsync(async (req, res) => {
    const addressId = req.params.id;
    const result = await addressService.getAddressById(
        req.currentUser.id,
        addressId
    );
    return res.json(result);
});
const editCustomAddress = catchAsync(async (req, res) => {
    const addressId = req.params.id;
    const addressData = req.body.address;
    const result = await addressService.updateAddress(
        req.currentUser.id,
        addressId,
        addressData
    );
    return res.json(result);
});
const removeCustomAddress = catchAsync(async (req, res) => {
    const addressId = req.params.id;
    const result = await addressService.deleteAddress(
        req.currentUser.id,
        addressId
    );
    return res.json(result);
});
module.exports = {
    getUserProfile,
    getAddressBook,
    createAddress,
    getAddressById,
    editCustomAddress,
    removeCustomAddress,
};
