const express = require("express");

const router = express.Router();
const controller = require("../controllers/Invitations");

const requireToken = require("../middlewares/authenticate");

router
    .route("/")
    .post(requireToken, controller.create)
    .get(requireToken, controller.getAll);

router
    .route("/:id")
    .get(requireToken, controller.getById)
    .put(requireToken, controller.update)
    .delete(requireToken, controller.remove);

module.exports = router;
