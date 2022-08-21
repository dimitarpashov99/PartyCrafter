var express = require('express');
var router = express.Router();

var usersController = require('../controllers/Users');
/* GET users listing. */
router.route('/:id').get(usersController.getById);

module.exports = router;
