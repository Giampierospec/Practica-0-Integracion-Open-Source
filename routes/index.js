var express = require('express');
var router = express.Router();
const {MainController} = require('../controllers/mainController');
/* GET home page. */
router.route('/')
      .get(MainController.getIndex);

module.exports = router;
