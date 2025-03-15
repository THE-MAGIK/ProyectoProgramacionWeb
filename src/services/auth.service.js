// Importa los módulos necesarios 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const rols_permissions = requiere('../models/rolspermissions.model');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la clave secreta para JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Función para iniciar sesión de un usuario
exports.loginUser = async (email, password) => {
    try {
        // Verifica si el usuario existe en la base de datos 
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verifica si la contraseña ingresada es correcta 
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {  
            throw new Error('Contraseña incorrecta');
        }

        // Obtiene los permisos del rol del usuario
        const rols_permissions = await rols_permissions.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permission_id']
        });

        // Mapea los permisos a un array
        const permisos = rols_permissions.map(rp => rp.permission_id);

        // Genera un token JWT 
        const token = jwt.sing(
            { id: user.id, name: user.name, email: user.email, rol_id: user.rol_id, permissions },
            SECRET_KEY,
            { expiresIn: '1h' } // Token expira en 1 hora
        );
        return token; // Devuelve el token generado

    } catch (error) {
        // Si ocurre un error, lanza una excepción con un mensaje descriptivo
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};
