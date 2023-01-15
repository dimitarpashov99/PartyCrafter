const express = require("express");

const router = express.Router();
const controller = require("../controllers/AddressBook");

const requireToken = require("../middlewares/authenticate");

router
    .route("/")
    .get(requireToken, controller.getAll)
    .post(requireToken, controller.create);

router
    .route("/:id")
    .get(requireToken, controller.getById)
    .put(requireToken, controller.update)
    .delete(requireToken, controller.remove);

module.exports = router;
