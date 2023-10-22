
const { response } = require('express');
const JWT = require('jsonwebtoken');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const validarJWT= (req, res=response, next)=>{

    // leer header
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token'
        })
    }
    try {
        const {uid, name} = JWT.verify(token, process.env.SECRET_JWT)
        req.uid= uid
        req.name= name
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
    next();

}

module.exports={
    validarJWT
}