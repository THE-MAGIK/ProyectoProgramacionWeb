// Importa los módulos necesarios 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const rols_permissions = require('../models/rols_permissions.model');

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
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {  
            throw new Error('Contraseña incorrecta');
        }

        // Obtiene los permisos del rol del usuario
        let rols = await rols_permissions.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permission_id']
        });

        // Mapea los permisos a un array
        let permisos = rols.map(rp => rp.permission_id);

        // Genera un token JWT 
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h' } // Token expira en 1 hora
        );
        return token; // Devuelve el token generado

    } catch (error) {
        // Si ocurre un error, lanza una excepción con un mensaje descriptivo
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};

exports.registerUser = async (name, email, password, rol_id) => {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Ya existe un usuario con ese correo');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            rol_id
        });

        return newUser;
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el usuario');
    }
};
