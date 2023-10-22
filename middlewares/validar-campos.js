const express = require('express')
const { validationResult } = require('express-validator')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const validarCampos = (req, res, next) => {
    // manejo de errores
    console.log('Hola', req)
    const errors= validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            error: errors.mapped()
        })
    }
    next();
}

module.exports = validarCampos;