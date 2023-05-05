const { unlink } = require('node:fs/promises')
const express = require('express')
const { validationResult, body } = require('express-validator')
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')


const { Price,Category, Property, Message, User } = require('../model/index.js')
const { esVendedor,formatDate } = require('../helpers/index.js')
const { generateId } = require('../helpers/token.js')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/uploads/')
    },
    filename: function(req,file,cb){
        cb(null, generateId() + path.extname(file.originalname) )
    }
})

const fileUpload = multer( { storage } )


const router = express.Router();

async function protectRoute(req, res, next){
    console.log('desde el middleware..')
    // Verificar si hay un token
    //console.log(req.cookies._token)
    const { _token } = req.cookies
    if(!_token){
        return res.redirect('/auth/login')
    }

    // comprobar el token
    try {

        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        //console.log(decoded)

        const user = await User.scope('deletePassword').findByPk(decoded.id)
        //console.log(user)

        // Almacenar al usuario req
        if(user){
            req.user = user
        } else {
            return res.redirect('/auth/login')
        }
        
        return next();

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }

    next();
}


async function IdentifyUser (req, res, next ) {

    // Identificar si hay un tocken en las cookies
    const { _token } = req.cookies
    if(!_token){
        req.user = null
        return next()
    }

    // Comprobar el token
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        //console.log(decoded)

        const user = await User.scope('deletePassword').findByPk(decoded.id)
        //console.log(user)

        // Almacenar al usuario req
        if(user){
            req.user = user
        }
        
        return next();        
    } catch (error) {
        console.log(error)
        return res.clearCookie('_token').redirect('/auth/login')
    }


}

//router.get('/my-properties', protectRoute, admin)
router.get('/my-properties', protectRoute, async(req,res) => {
    
    
    //console.log(req.query)
    
    // Leer Query String -- alt + 94 es ^
    const { page:actualPage } = req.query
    const expression = /^[1-9]$/
    if(!expression.test(actualPage)){
        return res.redirect('/my-properties?page=1')
    }

    try {

        const { id } = req.user
        
        // Limites y offset para el paginador
        const limit = 5
        const offset = ((actualPage * limit) - limit)

        console.log( id )
        const [properties, total] = await Promise.all([
            Property.findAll({
                limit: limit,
                offset: offset,
                where: {
                    userid:id
                }
                ,
                include: [
                    { model: Category, as: 'category' },
                    { model: Price, as: 'price' },
                    { model: Message, as: 'messages' }
                ]
            }),
            Property.count({
                where:{
                    userid:id
                }
            })
        ])

        console.log(total)
    
        res.render('properties/admin',{
            pageLabel: 'Mis propiedades',
            properties,
            csrfToken: req.csrfToken(),
            pages: Math.ceil(total / limit),
            actualPage: Number(actualPage),
            total,
            offset,
            limit
        })

    } catch (error) {
        console.log(error)
    }


})

// Formulario para crear nueva propiedad
// router.get('/properties/create', protectRoute, create)
router.get('/properties/create', protectRoute, async (req,res) => {
    
    // Modelo de precios y categorias
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create',{
        pageLabel: 'Crear propiedad',
        categories,
        prices,
        csrfToken: req.csrfToken(),
        info:{}
    })
})

//save
router.post('/properties/create', protectRoute, 
    body('title').notEmpty().withMessage('El título del anuncio es obligatorio'),
    body('description')
        .notEmpty().withMessage('El campo descripción es obligatorio')
        .isLength({max:200}).withMessage('La descripción es muy larga...'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('price').isNumeric().withMessage('Selecciona una rango de precio'),
    body('bedrooms').isNumeric().withMessage('Selecciona cantidad de habitiaciones'),
    body('parking').isNumeric().withMessage('Selecciona cantidad de estacionamientos'),
    body('toilets').isNumeric().withMessage('Selecciona cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    async(req,res) => {


        // Validacion
        let result = validationResult(req)
    
        // verificar result esté vacio
        if(!result.isEmpty()){
            // Modelo de precios y categorias
            const [ categories, prices ] = await Promise.all([
                Category.findAll(),
                Price.findAll()
            ])        
    
            //Existen errores...
            return res.render('properties/create',{
            pageLabel: 'Crear propiedad',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            info:req.body
        })
        }
    
        // Crear Registro
    
        const { title,description, bedrooms, parking, toilets, street, lat, lng, category, price } = req.body
    
        //console.log(req.body)
        //console.log(req.user)
        const { id: userid } = req.user
    
        try {
    
            const property = await Property.create({
                title,
                description,
                bedrooms, parking, toilets,
                street, lat, lng, 
                categoryid: category, 
                priceid: price,
                userid,
                picture:''
    
            })
    
            const { id } = property
    
            res.redirect(`/properties/add-image/${ id }`)
    
    
    
        } catch (error) {
            console.log(error)
        }
    
    }
)
|


// router.get('/properties/add-image/:id',  protectRoute, addImage)
router.get('/properties/add-image/:id',  protectRoute, async(req,res) => {
    //res.send('Add image...')

    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/my-properties')
    }

    // Validar que la propiedad esté publicada
    if(property.published){
        return res.redirect('/my-properties')
    }


    // Validar que la propiedad pertenece a quien visita esta página
    // console.log(req.user.id)
    
    // console.log(property.userid)

    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }


    res.render('properties/add-image',{
        pageLabel:`Agregar Imagen: ${ property.title }`,
        csrfToken: req.csrfToken(),        
        property
    })
})

// router.post('/properties/add-image/:id', protectRoute, fileUpload.single('image'), saveFile )
router.post('/properties/add-image/:id', protectRoute, fileUpload.single('image'), async( req, res, next ) =>{

    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/my-properties')
    }

    // Validar que la propiedad esté publicada
    if(property.published){
        return res.redirect('/my-properties')
    }


    // Validar que la propiedad pertenece a quien visita esta página


    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }

    try {
        console.log(req.file)


        // almacenar imagen y publicar propiedad
        property.picture = req.file.filename
        property.published = 1

        await property.save()

        next()

    } catch (error) {
        console.log(error)
        
    }
})

//router.get('/properties/edit/:id', protectRoute, edit)
router.get('/properties/edit/:id', protectRoute, async(req,res) =>{

    const { id } = req.params

    // Validar que propiedad exista
    const property = await Property.findByPk( id )

    if(!property){
        return res.redirect('/my-properties')
    }

    // Revisar quien visita la URL es el creó la propiedad
    if(property.userid.toString() !== req.user.id.toString()){
        return res.redirect('/my-properties')
    }

    // Modelo de precios y categorias
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/edit',{
        pageLabel: `Editar propiedad: ${ property.title }`,
        categories,
        prices,
        csrfToken: req.csrfToken(),
        info: property
    })
})

//saveChange
router.post('/properties/edit/:id', protectRoute, 
    body('title').notEmpty().withMessage('El título del anuncio es obligatorio'),
    body('description')
        .notEmpty().withMessage('El campo descripción es obligatorio')
        .isLength({max:200}).withMessage('La descripción es muy larga...'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('price').isNumeric().withMessage('Selecciona una rango de precio'),
    body('bedrooms').isNumeric().withMessage('Selecciona cantidad de habitiaciones'),
    body('parking').isNumeric().withMessage('Selecciona cantidad de estacionamientos'),
    body('toilets').isNumeric().withMessage('Selecciona cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    async(req,res) => {

    // console.log('Guardar Cambios.....')

    // Verificar la validación

    let result = validationResult(req)

    // verificar result esté vacio
    if(!result.isEmpty()){
        // Modelo de precios y categorias
        const [ categories, prices ] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])        

        //Existen errores...
         return res.render('properties/edit',{
            pageLabel: `Editar propiedad`,
            csrfToken: req.csrfToken(),            
            categories,
            prices,
            errors: result.array(),
            info: req.body
        })         
         
    }



    const { id } = req.params

    // Validar que propiedad exista
    const property = await Property.findByPk( id )

    if(!property){
        return res.redirect('/my-properties')
    }

    // Revisar quien visita la URL es el creó la propiedad
    if(property.userid.toString() !== req.user.id.toString()){
        return res.redirect('/my-properties')
    }    

    // Reescribir el registro al actualizarlo
    try {
       // console.log(property)
       const { title,description, bedrooms, parking, toilets, street, lat, lng, category, price } = req.body
    
       property.set({
            title,
            description,
            bedrooms, parking, toilets,
            street, lat, lng, 
            categoryid: category, 
            priceid: price 
       })

       await property.save()

       res.redirect('/my-properties')

    } catch (error) {
        console.log(error)
    }
})

// router.post('/properties/remove/:id', protectRoute, remove)

router.post('/properties/remove/:id', protectRoute, async(req,res) => {

    //console.log('inicio eliminacion registro..')

    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/my-properties')
    }


    // Validar que la propiedad pertenece a quien visita esta página
    // console.log(req.user.id)
    
    console.log('property.userid = 1')

    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }

    // Eliminar la imagen asociada
    console.log(`se eliminará registro..`)
    await unlink(`public/uploads/${ property.picture }`)
    console.log(`se eliminó la imagen ${ property.picture }`)

    // Eliminar la propiedad
    await property.destroy()
    res.redirect('/my-properties')
    
})

// Modifica el estado de la propiedad
// router.put('/properties/changeState/:id', protectRoute, changeState)
router.put('/properties/changeState/:id', protectRoute, async(req,res) => {
    

    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/my-properties')
    }


    // Validar que la propiedad pertenece a quien visita esta página
    // console.log(req.user.id)
    
    console.log('property.userid = 1')

    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }

    //console.log('cambiando estado...')
    property.published = !property.published

    await property.save()

    res.json({
        res:'ok'
    })
})

// showProperty
router.get('/property/:id', 
    IdentifyUser, async(req,res) => {
    //res.send('mostrando titulo...')

    const { id } = req.params

    //res.send(id)

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id, {
        include: [
            { model: Category, as: 'category' },
            { model: Price, as: 'price' }
        ]       
    })
    
    //res.send(property)

    if(!property || !property.published){
        return res.redirect('/404')
    }

    // console.log( esVendedor(req.user?.id, property.userid ) )

    res.render('properties/showProperty',{
        property,
        pageLabel: property.title,
        csrfToken: req.csrfToken(),
        user:req.user,
        esVendedor: esVendedor(req.user?.id, property.userid )
    })


})

// sendMesage
// Almacenar los mensajes
router.post('/property/:id', 
    IdentifyUser,
    body('message').isLength({min:5}).withMessage('El mensaje no puede ir vacio o es muy corto'),
    async(req,res) => {
    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id, {
        include: [
            { model: Category, as: 'category' },
            { model: Price, as: 'price' }
        ]       
    })
    
    if(!property){
        return res.redirect('/404')
    }

    // Renderizar los errores que se encuentren
    // Validacion
    let result = validationResult(req)

    // verificar result esté vacio
    if(!result.isEmpty()){
        // Modelo de precios y categorias
        return res.render('properties/showProperty',{
            property,
            pageLabel: property.title,
            csrfToken: req.csrfToken(),
            user:req.user,
            esVendedor: esVendedor(req.user?.id, property.userid ),
            errors: result.array(), 
        })
    }

    // console.log(req.body)
    // console.log(req.params)
    // console.log(req.user)

    const { message } = req.body
    const { id:propertyid } = req.params
    const { id:userid} = req.user

    //return;

    // Almacenar el mensaje
    await Message.create({
        message,
        propertyid,
        userid
    })    

    res.render('properties/showProperty',{
        property,
        pageLabel: property.title,
        csrfToken: req.csrfToken(),
        user:req.user,
        esVendedor: esVendedor(req.user?.id, property.userid ),
        sendMesage: true
    })


})

//seeMessages
router.get('/messages/:id',
    protectRoute,
    async(req,res) => {

    //res.send('Mensajes..')
    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id,{
        include: [
            { model: Message, as: 'messages',
                include: [
                    { model: User.scope('deletePassword'), as: 'user' }                  
                ] }
        ]
    })
    if(!property){
        return res.redirect('/my-properties')
    }


    // Validar que la propiedad pertenece a quien visita esta página
    // console.log(req.user.id)
    
    console.log('property.userid = 1')

    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }

    res.render('properties/messages',{
        pageLabel: 'Mensajes',
        messages: property.messages,
        formatDate,
    })
})

module.exports = router