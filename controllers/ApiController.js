const express = require('express')
const { Property, Price, Category } = require('../model/index.js')

const router = express.Router();

//router.get('/properties', properties )
router.get('/properties', async(req,res) => {

    const properties = await Property.findAll({
        include:[
            {model: Price, as: 'price' },
            {model: Category, as: 'category' }
        ]
    })

    res.json(properties)
})

module.exports = router