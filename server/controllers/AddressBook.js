const catchAsync = require("../utils/catchAsync");

const addressBookService = require("../services/addressBook");

const getById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await addressBookService.getAddressBookById(id);
    res.json(result);
});

const getAll = catchAsync(async (req, res) => {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const result = await addressBookService.getAddressBooks(filter);
    res.json(result);
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
