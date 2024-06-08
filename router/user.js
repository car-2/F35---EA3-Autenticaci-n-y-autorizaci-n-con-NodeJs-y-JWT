const { Router } = require('express');
const User = require('../models/User');
const { validatorUser } = require('../helpers/validator-user');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', [
    // Validación de los campos de entrada utilizando express-validator
    check('name', 'invalid.name').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('rol', 'invalid.rol').isIn(['ADMIN', 'DOCENTE']),
    check('password', 'invalid.password').not().isEmpty(),
    validarJWT,
    validarRolAdmin

], async function (req, res) {

    try {

        console.log(req.body);

        // Validar los resultados de la validación express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const validator = validatorUser(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }

        console.log('Objeto recibido ✅', req.body);

        // Verificar si el correo electrónico ya está en uso
        const emailExists = await User.findOne({ email: req.body.email });
        console.log(emailExists);
        if (emailExists) {
            return res.status(400).send("Email ya existe 🔧");
        }

        // Crear un nuevo usuario
        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.rol = req.body.rol;

        // Generar el hash de la contraseña
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        user.password = password;

        user.creationDate = new Date();
        user.updateDate = new Date();

        // Guardar el usuario en la base de datos
        user = await user.save();
        res.send(user);

    } catch (error) {
        res.status(500).send('Ha ocurrido un Error 🚨');
        console.log(error);
    }

});

// Ruta para obtener todos los usuarios
router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const users = await User.find();
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }

});

// Ruta para actualizar un usuario por su ID
router.put('/:userId', [validarJWT, validarRolAdmin], async function (req, res) {
    try {

        const validator = validatorUser(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }

        // Buscar el usuario por su ID
        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).send("No se encontró un usuario con ese id 🚨");
        };

        // Verificar si el correo electrónico está siendo utilizado por otro usuario
        const emailVerify = await User.findOne({ email: req.body.email, _id: { $ne: user._id } });
        if (emailVerify) {
            return res.status(400).send("El correo está siendo utilizado por otro usuario 🐛");
        }

        // Actualizar los datos del usuario
        user.name = req.body.name;
        user.email = req.body.email;
        user.rol = req.body.rol;

        // Generar el hash de la nueva contraseña
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        user.password = password;

        user.updateDate = new Date();

        // Guardar los cambios en el usuario
        user = await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }

});

// Ruta para obtener un usuario por su ID
router.get('/:userId', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).send('Ha ocurrido un Error 🚨');
        };
        res.send(user);

    } catch (error) {
        console.log(error)
    }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:userId', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).send("No se encontró un usuario con ese id 🚨");
        }

        await user.remove();
        const userName = user.name; // Obtener el nombre del usuario eliminado
        res.send(`El Usuario "${userName}" ha sido Eliminado Exitosamente ✅`);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }
});

module.exports = router;
