var express = require("express");
var router = express.Router();

const eventsController = require("../controllers/PartyEvents");

router.post('/create', eventsController.create);
router.get("/:id", eventsController.getById);
router
    .route("/:code")
    .get(eventsController.getByCode)
    .delete(eventsController.remove);

module.exports = router;
