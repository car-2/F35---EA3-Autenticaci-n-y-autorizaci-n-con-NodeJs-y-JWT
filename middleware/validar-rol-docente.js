const jwt = require('jsonwebtoken');

// Middleware para validar el rol de docente
const validarRolDocente = (req, res, next) => {
    // Verificar si el rol del usuario no es 'DOCENTE' ni 'ADMIN'
    if (req.payload.rol !== 'DOCENTE' && req.payload.rol !== 'ADMIN') {
        return res.status(401).json({ mensaje: '🚨 Error, No estás Autorizado para acceder a esta Función.' });
    }
    next();
}

module.exports = {
    validarRolDocente
}
