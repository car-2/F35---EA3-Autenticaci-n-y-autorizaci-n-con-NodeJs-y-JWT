const mongo = require('mongoose');
require('dotenv').config(); // Importa las variables de entorno del archivo .env

const getConnection = async() => {
    try{
        await mongo.connect(process.env.MONGO_URL); // Conecta a la base de datos usando el valor de la variable de entorno
        console.log('Conexion Exitosa');
    } catch (error){
        console.log('Error de conexión a la base de datos:', error.message);
    }
}

module.exports = {
    getConnection,
}