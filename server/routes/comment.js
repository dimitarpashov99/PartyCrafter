const express = require("express");
const router = express.Router();

const commentsController = require('../controllers/Comments');
router.post("/send", commentsController.create);
router.post("/edit", commentsController.create);
router.get("/:eventId", commentsController.getEventComments);

router.delete("/remove", commentsController.remove);

module.exports = router;
