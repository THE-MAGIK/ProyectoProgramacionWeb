// Importamos los módulos necesarios
const sequelize = require('./config/database');
const app = require ('./app');
const dotenv = require ('dotenv'); 
require('./models/association'); 

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Definimos el puerto en el que correrá el servidor, usando el de entorno o 5432 (que es un puerto de PostgreSQL, no de un servidor web)
const PORT = process.env.PORT || 3000; 

// Intentamos autenticar la conexión con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');
        
        // Iniciamos el servidor en el puerto especificado
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err));

// Sincronizamos la base de datos sin forzar la recreación de tablas
sequelize.sync({force: false})
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });