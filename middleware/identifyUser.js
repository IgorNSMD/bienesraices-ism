const jwt = require('jsonwebtoken')
const User = require('../model/User.js')

const IdentifyUser = async (req, res, next ) => {

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

module.exports = IdentifyUser;