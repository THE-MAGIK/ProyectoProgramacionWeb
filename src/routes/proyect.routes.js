// Importa Express y crea un nuevo router
const express = require('express');
const router = express.Router();

// Importa el controlador de proyectos
const proyectController = require('../controllers/proyect.controller');

// Importa los roles definidos y middlewares de autenticación y control de roles
const { ROLS } = require('../utils/constants');
const { authenticateToken, checkRol } = require('../middlewares/auth.middleware');

// Rutas protegidas para la gestión de proyectos
// Solo ADMIN puede crear un proyecto
router.post('/proyects/create', authenticateToken, checkRol([ROLS.ADMIN]), proyectController.createproyect);

// Solo ADMIN puede actualizar un proyecto existente
router.put('/proyects/update/:id', authenticateToken, checkRol([ROLS.ADMIN]), proyectController.updateProyect);

// Solo ADMIN puede eliminar un proyecto
router.delete('/proyects/delete/:id', authenticateToken, checkRol([ROLS.ADMIN]), proyectController.deleteProyect);

// ADMIN y USER pueden ver todos los proyectos
router.get('/proyects', authenticateToken, checkRol([ROLS.ADMIN, ROLS.USER]), proyectController.getAllProyects);

// ADMIN y USER pueden ver un proyecto específico por ID
router.get('/proyects/:id', authenticateToken, checkRol([ROLS.ADMIN, ROLS.USER]), proyectController.getProyectById);

// Solo ADMIN puede asociar usuarios a un proyecto
router.post('/proyects/associate', authenticateToken, checkRol([ROLS.ADMIN]), proyectController.assignUsersToProyect);

// Solo ADMIN puede desasociar usuarios de un proyecto
router.delete('/proyects/disassociate', authenticateToken, checkRol([ROLS.ADMIN]), proyectController.removeUserFromProyect);

// Exporta el router para usarlo en la app principal
module.exports = router;

module.exports = router;
