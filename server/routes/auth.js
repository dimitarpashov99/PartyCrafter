const express = require("express")

var router = express.Router()
var authController = require("../controllers/Auth");

router.route("/signup").post(authController.register);
router.route("/signin").post(authController.login);

module.exports = router;
