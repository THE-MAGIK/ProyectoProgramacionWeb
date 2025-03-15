// Importamos los módulos necesarios para crear el servidor y manejar CORS
const express = require ('express'); 
const cors = require ('cors'); 

const app = express(); // Se crea una instancia de la aplicación Express

// Configuración para permitir que la aplicación procese JSON y evitar problemas de CORS
app.use(express.json()); // Habilita el uso de JSON en las peticiones
app.use(cors()); // Permite solicitudes de otros dominios

// Importar rutas para manejar usuarios, autenticación y proyectos
const userRoutes = require ('./routers/user.routers'); 
const authRoutes = require ('./routers/auth.routers'); 
const projectRoutes = require ('./routers/project.routers');

// Definimos las rutas de la API y las asociamos a los archivos correspondientes
app.use('/api/v1/users', userRoutes); // Ruta para los usuarios
app.use('/api/v1/auth', authRoutes); // Ruta para autenticación
app.use('/api/v1/projects', projectRoutes); // Ruta para proyectos

// Exportamos la instancia de la aplicación para que pueda ser utilizada en otros archivos
module.exports = app; 