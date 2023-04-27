var Sequelize = require('sequelize');
var dotenv = require('dotenv');
var fs = require("fs")

dotenv.config({
    path:'.env'
})
const  db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host:process.env.DB_HOST,
        port:3306,
        dialect:'mysql',
    define: {
        timestamps: true
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(__dirname + '/ssl/DigiCertGlobalRootCA.crt.pem')
        }
    }
    //operatorsAliases:false
});

module.exports = db;

