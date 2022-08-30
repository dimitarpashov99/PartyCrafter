const express = require("express");
const router = express.Router();

const commentsController = require('../controllers/Comments');
router.post("/send", commentsController.create);
router.get("/:eventId", commentsController.getEventComments);
router.get("/:userId", commentsController.getEventComments);
router.delete("/:id", commentsController.remove);

module.exports = router;
