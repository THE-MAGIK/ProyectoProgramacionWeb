const { User, Proyect } = require('../models');

// Crear proyecto
exports.createproyect = async (data) => {
    const proyect = await Proyect.create(data);
    return proyect;
};

// Obtener todos los proyectos
exports.getAllproyects = async () => {
    try {
        const proyects = await Proyect.findAll({
            include: [
                {
                    model: User,
                    as: 'administrator',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'proyectusers', // nombre del alias usado en la asociación
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] }
                }
            ]
        });

        return proyects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Obtener proyectos por ID de usuario (opcional si lo vas a usar)
exports.getproyectsByuserId = async (user_id) => {
    const user = await User.findByPk(user_id, {
        include: {
            model: Proyect,
            as: 'userproyects',
            through: { attributes: [] }
        }
    });

    if (!user) throw new Error('Usuario no encontrado');
    return user.userproyects;
};

// Asignar usuarios a proyecto
exports.assignUsersToProyect = async (data) => {
    const proyect = await Proyect.findByPk(data.proyectId);
    if (!proyect) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: data.userIds } });
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await proyect.addProyectusers(users); // usa el alias correcto
    return await Proyect.findByPk(data.proyectId, {
        include: [
            {
                model: User,
                as: 'proyectusers',
                attributes: ['id', 'name', 'email'],
                through: { attributes: [] }
            }
        ]
    });
};

// Remover usuario del proyecto
exports.removeUserFromProyect = async (data) => {
    const proyect = await Proyect.findByPk(data.proyectid);
    if (!proyect) throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(data.userid);
    if (!user) throw new Error('Usuario no encontrado');

    await proyect.removeProyectuser(user); // alias correcto en singular
};

// Actualizar proyecto
exports.updateProyect = async (data) => {
    const proyect = await Proyect.findByPk(data.proyectid);
    if (!proyect) throw new Error('Proyecto no encontrado');

    await proyect.update(data);
    return proyect;
};

// Eliminar proyecto
exports.deleteProyect = async (id) => {
    const proyect = await Proyect.findByPk(id);
    if (!proyect) throw new Error('Proyecto no encontrado');

    await proyect.destroy();
    return { message: 'Proyecto eliminado correctamente' };
};

// Obtener proyecto por ID
exports.getProyect = async (id) => {
    const proyect = await Proyect.findByPk(id, {
        include: [
            {
                model: User,
                as: 'proyectusers',
                attributes: ['id', 'name', 'email'],
                through: { attributes: [] }
            }
        ]
    });

    if (!proyect) throw new Error('Proyecto no encontrado');
    return proyect;
};
