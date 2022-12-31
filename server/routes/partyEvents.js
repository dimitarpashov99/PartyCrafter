var express = require("express");
var router = express.Router();
const eventsController = require("../controllers/PartyEvents");

const authenticate = require("../middlewares/authenticate");

router
    .route("/")
    .post(authenticate, eventsController.create)
    .get(authenticate, eventsController.getById)
    .delete(authenticate, eventsController.remove);

router.route("/:code").get(authenticate, eventsController.getByCode);

router.post("/join", authenticate, eventsController.join);

module.exports = router;
