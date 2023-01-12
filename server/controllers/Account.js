const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");

const accountService = require("../services/account");
const addressService = require("../services/address");

const getUserProfile = catchAsync(async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Missing id parameter");
    }
    const result = await accountService.getUserProfile(userId);
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

const getUserInvitations = catchAsync(async (req, res) => {
    const userId = req.currentUser.id;
    const result = await accountService.getInvitations(userId);
    res.json(result);
});

// const getInvitation = catchAsync(async (req, res) => {
//     const inviteId = req.params.id;
//     const result = await accountService.getInvitation(inviteId);
//     res.json(result);
// });


module.exports = {
    getUserProfile,
    getAddressBook,
    createAddress,
    getAddressById,
    editCustomAddress,
    removeCustomAddress,
    getUserInvitations,
    // getInvitation
};
