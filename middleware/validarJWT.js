const jwt = require('jsonwebtoken');

// Middleware para validar el token JWT
const validarJWT = (req, res, next) => {
    // Obtener el token de autenticación del encabezado de la solicitud
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensaje: '🔒️ No estás Autorizado para acceder a esta función. Falta el Token de Autenticación.' });
    }

    try {
        // Verificar y decodificar el token utilizando la clave secreta '123456'
        const payload = jwt.verify(token, '123456');

        // Almacenar los datos decodificados del token en el objeto de solicitud (req.payload)
        req.payload = payload;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ mensaje: '🔒️ No estás Autorizado para acceder a esta función. El Token de Autenticación no es válido o ha Expirado.' });
    }
}

module.exports = {
    validarJWT
}
