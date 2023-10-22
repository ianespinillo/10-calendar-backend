/*
    /api/events
*/


const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, createEvents, updateEvents, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');
const router = express.Router();

// Obtener eventos 
router.use(validarJWT)
router.get(
    '/',
    [
        
    ], 
    getEventos);

// Crear eventos nuevos
router.post(
    '/', 
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'The start date is required').custom(isDate),
        check('start', 'The end date is required').custom(isDate),
        validarCampos,
    ], 
    createEvents);

// Actualizar eventos
router.put(
    '/:id',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'The start date is required').custom(isDate),
        check('start', 'The end date is required').custom(isDate),
        validarCampos,
    ], 
    updateEvents);

// Eliminar eventos
router.delete(
    '/:id',
    [
        
    ], 
    deleteEvent);

module.exports = router;
