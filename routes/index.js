var express = require('express');
var router = express.Router();
const path = require('path');
const {MainController} = require('../controllers/mainController');
const multer = require('multer');
let upload = multer({dest:path.resolve(__basedir,"/archives")})
/* GET home page. */
router.route('/')
      .get(MainController.getIndex);

router.route('/archive')
      .post(MainController.generateArchive);
router.route('/downloadArchive')
      .get(MainController.downloadArchive);

router.route('/readArchive')
      .get(MainController.renderReadFileView)
      .post(upload.single('archtxt'))

module.exports = router;
