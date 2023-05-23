
var express = require('express')

var { Sequelize } = require('sequelize')

var { Price, Category, Property }  = require('../model/index')

const router = express.Router();

router.get('/', async function(req,res){

  try {
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

    res.render('start',{
      pageLabel:'Inicio',
      categories, prices, houses, departments,
      csrfToken: req.csrfToken(),
    })

  } catch (err) {
    console.log(err);
    res.send('Sorry! Something went wrong.' + err);    
  }
 
})


module.exports = router;