const jwt = require('jsonwebtoken')
const { User } = require('../model/index.js')

const protectRoute = async(req, res, next) =>{
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

module.exports = protectRoute;