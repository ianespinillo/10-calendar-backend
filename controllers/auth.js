const {response} = require('express');
const {validationResult} = require('express-validator');
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/JWT');

const crearUsuario = async (req,res = response)=>{
    
    const {email, password} = req.body;
    
    try {
        let usuario= await Usuario.findOne({email});
        if (usuario){
            return res.status(400).json({
                ok:false,
                msg: 'Already exists an user with this email address'
            })
        }
        usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync()
        usuario.password= bcrypt.hashSync(password, salt)


        await usuario.save();

        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok:  true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        })
    }
}

const loginUsuario = async (req,res= response)=>{
    
    const { email, password } = req.body;
    
    try {
        let usuario= await Usuario.findOne({email});
        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg: 'Doesnt exist any user with that email'
            })
        }
        
        // Validar password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            })
        }
        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        })
    }

    res.json({
        ok:  true,
        msg: 'login',
        
    })
};

const revalidarJWT= async (req,res)=>{
    
    const uid= req.uid;
    const name= req.name;

    // generar un nuevo jwt
    const token = await generateJWT(uid, name)

    res.json({
        ok:  true,
        msg: 'renew',
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarJWT,

}