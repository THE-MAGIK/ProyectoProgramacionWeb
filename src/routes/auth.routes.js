// Importa Express y crea un nuevo router
const express = require('express');
const router = express.Router();

// Importa el controlador de autenticación
const authController = require('../controllers/auth.controller');

// Ruta POST para iniciar sesión (login)
// Al hacer POST a /auth/login se ejecuta la función login del controlador
router.post('/auth/login', authController.login);

// Exporta el router para usarlo en la app principal
module.exports = router;
