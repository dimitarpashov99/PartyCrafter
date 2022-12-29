const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const authController = require("../controllers/Auth");
const handleValidation = require("../middlewares/handleValidation");

router.post("/signup", authController.register);
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
    authController.login
);

module.exports = router;
