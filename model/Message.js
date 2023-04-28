const {DataTypes} = require('sequelize')

const db = require('../config/db.js')

const Message = db.define('messages',{
    message: {
        type: DataTypes.STRING(200),
        allowNull:false
    }
})

module.exports = Message