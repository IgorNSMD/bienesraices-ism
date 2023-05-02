const express = require('express')
const router = express.Router();

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