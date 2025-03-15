// Importa dotenv para manejar variables de entorno
const dotenv = require('dotenv'); 

// Carga las variables de entorno desde un archivo .env
dotenv.config(); 

// Exporta un objeto con las variables de entorno necesarias para la configuración del sistema
module.exports = {
    PORT: process.env.PORT,            // Puerto en el que se ejecutará el servidor
    DB_NAME: process.env.DB_NAME,      // Nombre de la base de datos
    DB_USER: process.env.DB_USER,      // Usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña de la base de datos
    DB_HOST: process.env.DB_HOST,      // Dirección del servidor de la base de datos
    DB_PORT: process.env.DB_PORT,      // Puerto de conexión a la base de datos
    JWT_SECRET: process.env.JWT_SECRET // Clave secreta para la autenticación con JWT
};
