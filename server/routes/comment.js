const express = require("express");
const router = express.Router();

const controller = require("../controllers/Comments");

router.route("/").get(controller.getAll).post(controller.create);

router
    .route("/:id")
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.remove);

module.exports = router;
