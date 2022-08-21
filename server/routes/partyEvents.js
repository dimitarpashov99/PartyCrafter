var express = require("express");
var router = express.Router();

const eventsController = require("../controllers/PartyEvents");

router.route("/create").post(eventsController.create);
router.route("/:id").get(eventsController.getById).put(eventsController.update);
router.route("/:code").get(eventsController.getByCode);

module.exports = router;
