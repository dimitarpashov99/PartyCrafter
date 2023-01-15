const catchAsync = require("../utils/catchAsync");

const addressBookService = require("../services/addressBook");

const getById = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await addressBookService.getAddressBook(userId);
    res.json({
        profile: result,
    });
});

const getAll = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await addressBookService.getAddressBook(userId);
    res.json({
        profile: result,
    });
});

const create = catchAsync(async (req, res) => {
    const address = req.body.address;
    const result = await addressBookService.createAddress(address);
    return res.json(result);
});

const update = catchAsync(async (req, res) => {
    const address = req.body.address;
    const result = await addressBookService.updateAddressBook(address);
    return res.json(result);
});

const remove = catchAsync(async (req, res) => {
    const address = req.body.address;
    const result = await addressBookService.deleteAddressBook(address);
    return res.json(result);
});

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};
