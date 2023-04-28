const {DataTypes} = require('sequelize')

const db = require('../config/db.js')

const Category = db.define('categories',{
    name: {
        type: DataTypes.STRING(50),
        allowNull:false
    }
})

module.exports = Category