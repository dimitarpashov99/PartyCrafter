const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createTokens } = require("../utils/authHelper");
const ApiError = require("../utils/APIError");
const create = () => {};

const getById = () => {};

const getAllAsQuery = () => {};

const update = () => {};

const remove = () => {};

module.exports = {
    create,
    getById,
    getAllAsQuery,
    update,
    remove,
};
