const express = require("express");

const router = express.Router();
const controller = require("../controllers/Users");

const requireToken = require("../middlewares/authenticate");

/**
 * Users API routes
 */
router.get("/", requireToken, controller.getAll);

router
    .route("/:id")
    .get(requireToken, controller.getById)
    .put(requireToken, controller.update)
    .delete(requireToken, controller.remove);

module.exports = router;
