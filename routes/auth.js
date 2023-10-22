/*
    Rutas de users/auth
    host + /api/auth
 */

const express = require('express');
const router = express.Router();
const {crearUsuario, loginUsuario, revalidarJWT} = require('../controllers/auth')
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should be at least 6 characters').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
    )

router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should be at least 6 characters').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', validarJWT ,revalidarJWT)

module.exports = router;