const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const controller = require("../controllers/Auth");
const handleValidation = require("../middlewares/handleValidation");

const requireToken = require("../middlewares/authenticate");

/**
 * Authorizetion API routes
 */
router.post("/signup", controller.register);
router.post(
    "/signin",
    body("email")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Request must contain email."),
    body("password")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Request must contain password."),
    handleValidation,
    controller.login
);

router.post("/changepassword", requireToken, controller.changePassword);

module.exports = router;
