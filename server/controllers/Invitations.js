const catchAsync = require("../utils/catchAsync");
const invitationsService = require("../services/invitations");

const create = [
    catchAsync(async (req, res) => {
        const eventCode = req.body?.eventCode;
        const guest = req.body?.guestData;
        const result = await invitationsService.createInvitation(
            eventCode,
            guest
        );
        res.json(result);
    }),
];
const getById = [
    catchAsync(async (req, res) => {
        const id = req.params?.id;
        const result = await invitationsService.getInvitation(id);
        res.json(result);
    }),
];

const getAll = [
    catchAsync(async (req, res) => {
        const filter = req.query?.filter;
        const result = await invitationsService.getInvitations(filter);
        res.json(result);
    }),
];

const update = [
    catchAsync(async (req, res) => {
        const menuId = req.params.id;
        const data = req.body.menuData;
        const result = await invitationsService.updateCustomMenu(menuId, data);
        res.json(result);
    }),
];

const remove = [
    catchAsync(async (req, res) => {
        const menuId = req.params.id;
        const result = await invitationsService.removeCustomFoodMenu(menuId);
        res.json(result);
    }),
];

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove,
};
