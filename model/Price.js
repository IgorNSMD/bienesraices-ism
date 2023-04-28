const {DataTypes} = require('sequelize')

const db = require('../config/db.js')

const Price = db.define('prices',{
    name: {
        type: DataTypes.STRING(50),
        allowNull:false
    }
})

module.exports = Price