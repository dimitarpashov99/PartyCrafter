const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/Comments");

router
    .route("/")
    .get(commentsController.getAllComments)
    .post(commentsController.create)
    .put(commentsController.edit);

router.get("/:eventId", commentsController.getEventComments);

router.delete("/remove", commentsController.remove);

module.exports = router;
