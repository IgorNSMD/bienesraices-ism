const express = require('express')
// const {getLogin, postAuthenticate, postSignOut, getRegister, postRegister, getConfirm, getRecoverPassword, postResetPassword,
//         getCheckToken, postNewPassword} = require('../controllers/UserController.js')

const router = express.Router();

router.get('/', function(req, res, next) {
        res.send('envio UserRoutes');
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