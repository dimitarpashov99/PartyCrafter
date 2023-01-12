const express = require("express");
const router = express.Router();

const controller = require("../controllers/Comments");

router
    .route("/")
    .get(controller.getAllComments)
    .post(controller.create)
    .put(controller.edit);

router.get("/:eventId", controller.getEventComments);

router.delete("/remove", controller.remove);

module.exports = router;
