var express = require("express");
var router = express.Router();
const eventsController = require("../controllers/PartyEvents");

const requireUserToken = require("../middlewares/authenticate");

router
    .route("/")
    .post(requireUserToken, eventsController.create)
    .get(requireUserToken, eventsController.getById)
    .delete(requireUserToken, eventsController.remove);

router.route("/:code").get(requireUserToken, eventsController.getByCode);

router.post("/join", requireUserToken, eventsController.join);

module.exports = router;
