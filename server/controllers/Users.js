const catchAsync = require("../utils/catchAsync");

const userService = require("../services/users");
const addressService = require("../services/address");
const ApiError = require("../utils/APIError");
const { StatusCodes } = require("http-status-codes");
const { validationResult, body } = require("express-validator");

const getUserProfile = [
    catchAsync(async (req, res) => {
        const userId = req.params.id;
        if (!userId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Missing id parameter");
        }
        const result = await userService.getUserProfile(userId);
        res.json({
            profile: result,
        });
    }),
];

const getAddressBook = [
    catchAsync(async (req, res) => {
        const userId = req.params.id;
        const result = await addressService.getAddressBook(userId);
        res.json({
            profile: result,
        });
    }),
];

const createAddress = [
    body("address").isEmpty().withMessage("Request must contain address"),
    catchAsync(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ error: errors.array() });
        }
        const address = req.body.address;
        const result = await addressService.createAddress(address);
        return res.json(result);
    }),
];
const getAddressById = [
    catchAsync(async (req, res, next) => {
        return next();
    }),
];
const editCustomAddress = [
    catchAsync(async (req, res, next) => {
        return next();
    }),
];
const removeCustomAddress = [
    catchAsync(async (req, res, next) => {
        return next();
    }),
];
module.exports = {
    getUserProfile,
    getAddressBook,
    createAddress,
    getAddressById,
    editCustomAddress,
    removeCustomAddress,
};
