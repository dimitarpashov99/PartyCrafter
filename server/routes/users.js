var express = require("express");

var router = express.Router();

var usersController = require("../controllers/Users");
var authController = require("../controllers/Auth");

/* GET users listing. */
router.route("/:id").get(usersController.getById);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

module.exports = router;
