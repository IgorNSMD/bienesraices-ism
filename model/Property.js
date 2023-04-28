const {DataTypes} = require('sequelize')

const db = require('../config/db.js')

const Property = db.define('properties',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    toilets: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    street: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull:false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull:false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
})

module.exports = Property;