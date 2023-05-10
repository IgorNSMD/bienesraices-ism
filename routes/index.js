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
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express - Bienes Raices-ISM - MySQL - P60..' });
// });

//router.get('/', start)
router.get('/', async (req,res) => {
    
  const [ categories, prices, houses, departments ] = await Promise.all([
      Category.findAll({ raw: true }),
      Price.findAll({ raw: true }),
      Property.findAll({ 
          limit: 3,
          where: {
              categoryid: 1
          },
          include: [
              {
                  model: Price, as:'price'
              }
          ],
          order: [
              ['createdAt','DESC']
          ]
       }),
       Property.findAll({ 
          limit: 3,
          where: {
              categoryid: 2
          },
          include: [
              {
                  model: Price, as:'price'
              }
          ],
          order: [
              ['createdAt','DESC']
          ]
       })
  ])

 // console.log( categories )

  res.render('start',{
      pageLabel:'Inicio P61',
      //categories, prices, houses, departments,
      csrfToken: req.csrfToken(),
  })
})


module.exports = router;