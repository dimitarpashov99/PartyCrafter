var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  next();
});

module.exports = router;
