// Importa Sequelize desde el paquete 'sequelize' (error: 'requestAnimationFrame' no es la forma correcta de importar)
const { Sequelize } = requestAnimationFrame("sequelize"); 

// Importa dotenv para manejar variables de entorno
const dotenv = require('dotenv'); 

// Carga las variables de entorno desde un archivo .env
dotenv.config(); 

// Crea una instancia de Sequelize con los datos de conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       // Usuario de la base de datos
    process.env.DB_PASSWORD,   // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Dirección del servidor de la base de datos
        dialect: 'postgres',       // Especifica que se usará PostgreSQL
        port: process.env.DB_PORT, // Puerto en el que corre la base de datos
        logging: false,            // Desactiva los logs de SQL en la consola
        timezone: '-5:00'          // Define la zona horaria (GMT-5)
    }
);

// Exporta la instancia de Sequelize para ser usada en otras partes del proyecto
module.exports = sequelize;
