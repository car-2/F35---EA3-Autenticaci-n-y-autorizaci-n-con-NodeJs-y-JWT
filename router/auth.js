const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const router = Router();

router.post('/', [
    // Validación de los campos de entrada utilizando express-validator
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
], async function (req, res) {

    try {
        console.log(req.body);

        // Validar los resultados de la validación express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        console.log('Objeto recibido', req.body);

        // Buscar un usuario por su dirección de correo electrónico
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ mensaje: 'Usuario no Encontrado 🚨' });
        }

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada del usuario
        const esIgual = bcrypt.compareSync(req.body.password, user.password);
        if (!esIgual) {
            return res.status(400).json({ mensaje: 'Usuario no Encontrado 🚨' });
        }

        // Generar un token JWT para el usuario
        const token = generarJWT(user);

        // Devolver la respuesta con los datos del usuario y el token JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            password: user.password,
            access_token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error interno del Servidor 🚨' });
    }

});

module.exports = router;
