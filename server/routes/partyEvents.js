var express = require("express");
var router = express.Router();

const eventsController = require("../controllers/PartyEvents");

router.route("/").post(eventsController.create);
router.route("/:id").get(eventsController.getById);
router
  .route("/:code")
  .get(eventsController.getByCode)
  .delete(eventsController.remove);

module.exports = router;
