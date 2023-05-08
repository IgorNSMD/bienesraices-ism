// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express - Bienes Raices-ISM - MySQL - P58..' });
// });

// module.exports = router;


var express = require('express')
var { Sequelize } = require('sequelize')
var { Price, Category, Property } = require('../model/index.js')

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express - Bienes Raices-ISM - MySQL - P60..' });
});

module.exports = router;