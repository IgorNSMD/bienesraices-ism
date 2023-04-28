const express = require('express')
const { properties } = require('../controllers/ApiController.js')


const router = express.Router()

router.get('/properties', properties )

module.exports = router