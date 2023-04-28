const { exit } = require('node:process')

const categories = require('./categories.js');
const prices = require('./prices.js');
const users = require('./users.js');

// import Category from '../model/Category.js';
// import Price from '../model/Price.js';

const db = require('../config/db.js')
const { Category,Price,User } = require('../model/index.js')

const importData = async() => {
    try {
        // Actualizar BD
        await db.authenticate()
        
        // Generar las columnas
        await db.sync()

        // Insertar los datos
        // await Category.bulkCreate(categories)
        // await Price.bulkCreate(prices)
        
        // Ejecutan la inserción al mismo tiempo
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users)
        ])

        console.log('Datos importados correctamente..')
        exit(0)

    } catch (error) {
        console.log(error)

        exit(1);

        //process.exit(1)        
    }
}

const deleteData = async() => {
    try {

        //- Elimina datos de las tablas
        // await Promise.all([
        //     Category.destroy({where:{}, truncate:true}),
        //     Price.destroy({where:{}, truncate:true})
        // ])

        await db.sync({force:true}) //- Elimina las tablas, datos y los recrea nuevamente
        
        console.log('Datos eliminados correctamente..')
        exit(0);
        
    } catch (error) {
        console.log(error)        
        exit(1);        
    }
}

if(process.argv[2] === "-i"){
    importData();
}

if(process.argv[2] === "-d"){
    deleteData();
}