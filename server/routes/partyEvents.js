const express = require("express");
const router = express.Router();
const controller = require("../controllers/PartyEvents");
const requireUserToken = require("../middlewares/authenticate");

router
    .route("/")
    .post(requireUserToken, controller.create)
    .get(requireUserToken, controller.getAll);

router
    .route("/:Id")
    .get(requireUserToken, controller.getById)
    .delete(requireUserToken, controller.remove);

module.exports = router;
