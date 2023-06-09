const express = require('express')
const { Sequelize } = require('sequelize')
const { Price, Category, Property } = require('../model/index.js')

const router = express.Router();

//router.get('/', start)
router.get('/', async (req,res) => {
    
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

   // console.log( categories )

    res.render('start',{
        pageLabel:'Inicio',
        categories, prices, houses, departments,
        csrfToken: req.csrfToken(),
    })
})

// Categorias
//router.get('/categories/:id', category)
router.get('/categories/:id', async (req,res) => {
    const { id } = req.params
    
    //console.log( id )

    // Comprobar que la categoría existe
    const category = await Category.findByPk(id)
    if(!category){
        return res.redirect('/404')
    }


    // Obtener las propiedades
    const properties = await Property.findAll({
        where: {
            categoryid: id
        },
        include:[
            {model: Price, as: 'price'}

        ]
    })

    res.render('category',{
        pageLabel: `${ category.name }s En venta `,
        properties,
        csrfToken: req.csrfToken(),
    })
})

//Pagina 404
//router.get('/404', notfound)
router.get('/404', (req,res) => {
    res.render('404',{
        pageLabel: 'No encontrada',
        csrfToken: req.csrfToken(),
    })
})

// Buscador
//router.post('/search', search)
router.post('/search', async(req,res) => {
    const { filter } = req.body

    // Validar que termino no esté vacio
    if(!filter.trim()){
        return res.redirect('back')
    }

    // Consultar las propiedades
    const properties = await Property.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: '%' + filter + '%'
            }
        },
        include: [
            { model: Price, as: 'price' }
        ]
    })

    //console.log(properties)
    res.render('search', {
        pageLabel: 'Resultado de la busqueda',
        csrfToken: req.csrfToken(),
        properties
    })
})

module.exports = router