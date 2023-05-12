// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express - Bienes Raices-ISM - MySQL - P58..' });
// });

// module.exports = router;


var express = require('express')

var { Sequelize } = require('sequelize')

var Category  = require('../model/Category.js')

const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express - Bienes Raices-ISM - MySQL - P60..' });
// });

//router.get('/', start)
router.get('/', async (req,res) => {

  var categories = await Category.findAll()
    
  console.log( categories )

  res.render('start',{
      pageLabel:'Inicio P69..',
      //categories, prices, houses, departments,
      //csrfToken: req.csrfToken(),
  })
})


module.exports = router;