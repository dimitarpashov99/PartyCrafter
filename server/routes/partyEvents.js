const express = require("express");
const router = express.Router();
const controller = require("../controllers/PartyEvents");
const requireUserToken = require("../middlewares/authenticate");

router
    .route("/")
    .post(requireUserToken, controller.create)
    .get(requireUserToken, controller.getById)
    .delete(requireUserToken, controller.remove);

router.route("/:code").get(requireUserToken, controller.getByCode);

router.post("/join", requireUserToken, controller.join);

module.exports = router;
