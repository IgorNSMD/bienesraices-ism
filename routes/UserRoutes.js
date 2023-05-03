const express = require('express')
// const { check, validationResult } = require('express-validator')
// const bcrypt = require('bcrypt')

const router = express.Router();

console.log('paso 1...')
// const User = require('../model/User.js')
// const { generateId,generateToken } = require('../helpers/token.js')
// const { emailRegister, emailRecoverPassword } = require('../helpers/emails.js')


router.get('/login', function testUser(req, res, next) {
    res.send('envio login...');
});


//router.get('/login', getLogin)

// router.post('/login', postAuthenticate)

// // Cerrar Sesión
// router.post('/signout', postSignOut)

// router.get('/register', getRegister )

// router.post('/register', postRegister )

// router.get('/confirm/:token', getConfirm)

// router.get('/recover-password', getRecoverPassword )
// router.post('/reset-password', postResetPassword )

// // Almacena la nueva password
// router.get('/recover-password/:token',getCheckToken )
// router.post('/recover-password/:token', postNewPassword )



module.exports = router