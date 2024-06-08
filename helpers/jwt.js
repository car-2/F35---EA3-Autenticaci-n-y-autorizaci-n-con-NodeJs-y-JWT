const jwt = require('jsonwebtoken');

// Función para generar un token JWT basado en los datos del usuario
const generarJWT = (user) => {
  // Crear el payload del token con los datos relevantes del usuario
  const payload = {
    _id: user.id,          // ID del usuario
    name: user.name,       // Nombre del usuario
    email: user.email,     // Correo electrónico del usuario
    rol: user.rol,         // Rol del usuario
    password: user.password  // Contraseña del usuario 
  };

  // Generar el token utilizando el método "sign" de jwt
  const token = jwt.sign(payload, '123456', { expiresIn: '1h' });
  // El segundo argumento ('123456') es la clave secreta utilizada para firmar el token
  // El tercer argumento especifica la duración de validez del token (1 hora en este caso)

  // Devolver el token generado
  return token;
};

// Exportar la función generarJWT para poder utilizarla en otros módulos
module.exports = {
  generarJWT
};
