// Importa el servicio de usuarios
const userService = require('../services/user.service'); 

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { name, email, password, rol_id, administrator_id } = req.body;
        
        // Llama al servicio para crear un usuario con los datos proporcionados
        const newUser = await userService.createUser(name, email, password, rol_id, administrator_id);
        
        // Responde con éxito y el usuario creado
        res.status(200).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        // Responde con error en caso de fallo
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los usuarios asociados a un administrador
exports.getAllUsersByAdministratorId = async (req, res) => {
    try {
        // Obtiene el ID del administrador desde el token de autenticación
        const admin_from_token = req.user.id;
        
        // Obtiene el correo electrónico desde la consulta (opcional)
        const { email } = req.query;
        
        // Llama al servicio para obtener los usuarios administrados por este ID
        const users = await userService.getAllUsersByAdministratorId(admin_from_token, email);
        
        // Responde con éxito y la lista de usuarios
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        // Responde con error si no se pueden obtener los usuarios
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Controlador para obtener todos los usuarios de un rol específico
exports.getAllUsersByRolId = async (req, res) => {
    try {
        // Llama al servicio para obtener los usuarios según el rol ID proporcionado en la URL
        const users = await userService.getAllUsersByRolId(req.params.id);
        
        // Responde con éxito y la lista de usuarios 
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        // Responde con error en caso de fallo
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    // Obtiene el ID del usuario desde los parámetros de la URL
    const { id } = req.params;

    // Extrae los datos a actualizar desde el cuerpo de la solicitud
    const { name, email, rol_id, administrator_id } = req.body;

    // Obtiene el ID del administrador desde el token de autenticación
    const admin_from_token = req.user.id;

    try {
        // Llama al servicio para actualizar el usuario con los datos proporcionados
        const user = await userService.updateUser(id, name, email, rol_id, administrator_id, admin_from_token);
        
        // Responde con éxito si la actualización se realizó correctamente
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        // Responde con error en caso de fallo 
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    // Obtiene el ID del usuario a eliminar desde los parámetros de la URL
    const { id } = req.params;

    // Obtiene el ID del administrador desde el token de autenticación
    const admin_from_token = req.user.id;

    try {
        // Llama al servicio para eliminar el usuario
        const result = await userService.deleteUsers(id, admin_from_token);
        
        // Responde con éxito si el usuario fue eliminado
        res.status(200).json(result);
    } catch (err) {
        // Responde con error en caso de fallo 
        res.status(500).json({ message: err.message });
    }
};
