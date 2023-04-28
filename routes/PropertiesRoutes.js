
const express = require('express')
const { body } = require('express-validator')

const { admin,create,save,addImage, saveFile,edit, saveChange, remove, changeState, 
    showProperty,sendMesage, seeMessages } = require('../controllers/PropertieController.js')

const protectRoute = require('../middleware/protectRoute.js');
const fileUpload = require('../middleware/fileUpload.js')
const IdentifyUser = require('../middleware/identifyUser.js')

const router = express.Router();

router.get('/my-properties', protectRoute, admin)
router.get('/properties/create', protectRoute, create)

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
    save
    )

router.get('/properties/add-image/:id',  protectRoute, addImage)

router.post('/properties/add-image/:id', protectRoute, fileUpload.single('image'), saveFile )


router.get('/properties/edit/:id', protectRoute, edit)


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
    saveChange
    )

router.post('/properties/remove/:id', protectRoute, remove)

router.put('/properties/changeState/:id', protectRoute, changeState)
//Area Publica
router.get('/property/:id', 
    IdentifyUser,
    showProperty
    )

// Almacenar los mensajes
router.post('/property/:id', 
    IdentifyUser,
    body('message').isLength({min:5}).withMessage('El mensaje no puede ir vacio o es muy corto'),
    sendMesage
    )

router.get('/messages/:id',
    protectRoute,
    seeMessages
)

module.exports = router