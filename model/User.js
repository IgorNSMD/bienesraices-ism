const {DataTypes} = require('sequelize')
//const bcrypt = require('bcrypt')

const db = require('../config/db.js')

const User = db.define('user',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
},{
    hooks:{
        beforeCreate: async function(user){
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash( user.password, salt )

        }
    },
    scopes:{
        deletePassword:{
            attributes:{
                exclude: ['password','token','confirmed','createdAt','updatedAt']
            }
        }
    }
})

User.prototype.VerifyPassword = function(password){
    //return bcrypt.compareSync(password, this.password)
    return this.password
}

module.exports = User