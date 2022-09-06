var express = require("express");

var router = express.Router();

var locationsController = require("../controllers/Locations");

router.route("/create").post(locationsController.create);

router.route("/:id").get(locationsController.getById);

module.exports = router;
