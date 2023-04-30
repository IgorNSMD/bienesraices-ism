var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express - Bienes Raices-ISM - MySQL - P29..' });
});

module.exports = router;
