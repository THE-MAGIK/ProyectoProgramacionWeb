// Importa el servicio que maneja la lógica de negocio relacionada con proyectos
const proyectService = require('../services/proyect.service');

// Asigna usuarios a un proyecto
exports.assignUsersToProyect = async (req, res) => {
    try {
        const data = req.body; // Datos enviados en el cuerpo de la petición (usuarios y proyecto)
        const updatedProyect = await proyectService.assignUsersToProyect(data); // Llama al servicio para asignar usuarios
        res.status(200).json(updatedProyect); // Responde con el proyecto actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
};

// Obtiene un proyecto por su ID
exports.getProyectById = async (req, res) => {
    try {
        const { proyectId } = req.params; // Obtiene el ID desde los parámetros de la URL
        const proyect = await proyectService.getProyectById(proyectId); // Llama al servicio para obtener el proyecto
        if (!proyect) return res.status(404).json({ message: 'Proyecto no encontrado' }); // Si no existe, responde 404
        res.status(200).json(proyect); // Proyecto encontrado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error de servidor
    }
};

// Crea un nuevo proyecto
exports.createproyect = async (req, res) => {
    try {
        const proyectData = req.body; // Datos del nuevo proyecto
        const newProyect = await proyectService.createproyect(proyectData); // Llama al servicio para crearlo
        res.status(201).json(newProyect); // Responde con el proyecto creado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Error en la petición
    }

};

// Obtiene todos los proyectos
exports.getAllProyects = async (req, res) => {
    try {
        const proyects = await proyectService.getAllProyects(); // Llama al servicio para obtener todos los proyectos
        res.status(200).json(proyects); // Devuelve la lista
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error de servidor
    }
};

// Actualiza un proyecto existente por ID
exports.updateProyect = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); // Forzar a número
        const proyectData = req.body;

        const updatedProyect = await proyectService.updateProyect(id, proyectData);

        res.status(200).json({ message: 'Proyecto actualizado correctamente', proyect: updatedProyect });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Elimina un proyecto por ID
exports.deleteProyect = async (req, res) => {
    try {
        const { id } = req.params; // ID del proyecto a eliminar
        const deletedProyect = await proyectService.deleteProyect(id); // Llama al servicio para eliminarlo

        if (!deletedProyect) {
            return res.status(404).json({ message: 'Proyecto no encontrado' }); // No se encontró el proyecto
        }

        res.status(200).json({ message: 'Proyecto eliminado correctamente' }); // Proyecto eliminado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error de servidor
    }
};

// Elimina un usuario de un proyecto
exports.removeUserFromProyect = async (req, res) => {
    try {
        const data = req.body; // Datos que indican qué usuario eliminar de qué proyecto
        await proyectService.removeUserFromProyect(data); // Llama al servicio para quitar al usuario
        res.status(200).json({ message: 'Usuario eliminado del proyecto correctamente' }); // Confirmación
    } catch (error) {
        res.status(400).json({ message: error.message }); // Error en la petición
    }
};
