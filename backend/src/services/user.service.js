const user = require('../models/user.model'); 
const bcrypt = require('bcryptjs'); 


// Función para crear un usuario
exports.createUser = async (name, email, password, rol_id, administrator_id) => {
    try{
       
        // Verificar si el usuario ya existe
        const userExists = await user.findOne({where : { email }}); 
        if (userExists){
            throw new Error('El usuario ya existe');
        }

        // Hashear la contraseña antes de guardarla
         const hashedPassword = await bcrypt.hash(password, 10);

        // // Crear un nuevo usuario
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            rol_id,
            administrator_id
        });

     return newUser;
    }catch(err){
        throw new Error(`Error al crear el usuario: ${err.message}`); 
    }
};

// Función para obtener usuarios por rol
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        // Busca todos los usuarios con el rol indicado, excluyendo la contraseña
        const users= await user.findAll({where: { rol_id },attributes: { exclude: [ 'password' ] }});
        return users;
    } catch(err){
        throw new Error(`Error al obtener los usuarios: ${err.message}`); 
    }
};

// Función para actualizar un usuario
exports.updateUser = async (id, name, email, rol_id, administrator_id, admin_from_token) => {
    try {
        
        const User = await user.findByPk(id);
        
        // Verifica si el usuario está bajo la administración del solicitante
        if (User.administrator_id !== admin_from_token){
            throw new Error ('Acceso denegado, este usuario no está bajo su administración');
        }

        // Verifica si el usuario existe
        if (!User) {
            throw new Error('Usuario no encontrado');
        }

        // Verifica si el email ya está en uso por otro usuario
        if (email && email !== User.email){
            const userExists = await user.findOne({ where: { email } }); 
            if (userExists){
                throw new Error('El email ya está en uso');
            };
        }

        // Actualiza el usuario con los nuevos datos
        await User.update({
            name,
            email,
            rol_id,
            administrator_id
        });

        return User;
    }catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`); 
    }
};

// Función para eliminar un usuario
exports.deleteUsers = async (id, admin_from_token) => {
    try {
        // Verifica si el usuario existe primero
        const User = await user.findByPk(id);
        if (!User) {
            throw new Error('Usuario no encontrado');
        }

        // Verifica si el usuario está bajo la administración del solicitante
        if (User.administrator_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        // Elimina el usuario
        await User.destroy();
        return {message: 'Usuario eliminado con éxito'};
    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};

