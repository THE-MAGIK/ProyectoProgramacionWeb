const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, checkRol } = require('../middlewares/auth.middleware');
const {ROLS} = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Ruta de usuarios
router.post('/users/create', authenticateToken, checkRol([ROLS.ADMIN]), userController.createUser);
router.put('/users/update/:id', authenticateToken, checkRol([ROLS.ADMIN]), userController.updateUser);
router.get('/users', authenticateToken, checkRol([ROLS.ADMIN]), userController.getAllUsersByAdministratorId);
router.delete('/users/delete/:id', authenticateToken, checkRol([ROLS.ADMIN]), userController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRol([ROLS.ADMIN]), userController.getAllUsersByRolId);

// Middleware para manejar errores
router.use(errorHandler);
module.exports = router;