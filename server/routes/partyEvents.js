var express = require("express");
var router = express.Router();
const eventsController = require("../controllers/PartyEvents");

const { authenticate } = require("../middlewares/authenticate");

router.post("/", authenticate, eventsController.create);
router.get("/:id", authenticate, eventsController.getById);
router
    .route("/:code")
    .get(eventsController.getByCode)
    .delete(eventsController.remove);

module.exports = router;
