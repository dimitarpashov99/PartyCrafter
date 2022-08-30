var express = require("express");

var router = express.Router();

var locationsController = require("../controllers/Locations");

router.route("/create").post(locationsController.create);

router.route("/:id").get(locationsController.getById);
router.route("/:host").get(locationsController.getByHostName);
router.route("/nearby/:locationId").get(locationsController.getNearbyLocations);

module.exports = router;
