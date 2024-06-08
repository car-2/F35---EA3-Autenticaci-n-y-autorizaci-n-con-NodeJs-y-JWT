const jwt = require('jsonwebtoken');

// Middleware para validar el rol de administrador
const validarRolAdmin = (req, res, next) => {
    // Verificar si el rol del usuario no es 'ADMIN'
    if (req.payload.rol !== 'ADMIN') {
        return res.status(401).json({ mensaje: '🔒️ Lo siento, no tienes permisos de Administrador para realizar esta acción.' });
    }
    next();
}

module.exports = {
    validarRolAdmin
}
