const  {ROLS} = require('../utils/constants');
const Proyects = require('../models/proyects.model');
const User = require('../models/user.model');

exports.createproyect = async (data) => {
    console.log('Datos recibidos en el servicio:', data); // Log para depurar
    const proyect = await Proyects.create(data);
    console.log('Proyecto creado en la base de datos:', proyect); // Log para confirmar la inserción
    return proyect;
};

exports.getAllProyects = async () => {
    try {
        const proyects = await Proyects.findAll({
            include: [
                {
                    model: User,
                    as: 'administrator',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'proyectusers',
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

exports.getProyectById = async (id) => {
    try {
        const proyect = await Proyects.findByPk(id);
        if (!proyect) {
            throw new Error('Proyecto no encontrado');
        }
        return proyect;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

exports.getproyectsByuserId = async (user_id) => {
    exports.getProyectsByUserId = async (user_id) => {
        try {
            const user = await User.findByPk(user_id, {
                include: [
                    {
                        model: Proyects,
                        as: 'proyects',
                        attributes: ['id', 'name', 'description'],
                        through: { attributes: [] }
                    }
                ],
                attributes: ['id', 'name', 'email']
            });
    
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
    
            return user.proyects;
        } catch (err) {
            throw new Error(`Error al obtener proyectos del usuario: ${err.message}`);
        }
    };
    
 };

exports.assignUsersToProyect = async (data) => {
    const proyect = await Proyects.findByPk(data.proyectId);
    if (!proyect) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: data.userIds } });
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await proyect.addUsuarios(users);
    return await Proyects.findByPk(data.proyectId, {
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'email'],
                through: { attributes: [] }
            }
        ]
    });
};

exports.removeUserFromProyect = async (data) => {
    const proyect = await Proyects.findByPk(data.proyectid);
    if (!proyect) throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(data.userid);
    if (!user) throw new Error('Usuario no encontrado');

    await proyect.removeUsuario(user);
};

exports.updateProyect = async (proyectid, data) => {
    console.log('ID del proyecto a actualizar:', proyectid); // Verifica el ID que llega

    const proyect = await Proyects.findByPk(proyectid);
    if (!proyect) throw new Error('Proyecto no encontrado');

    await proyect.update(data);
    return proyect;
};


exports.deleteProyect = async (id) => {
    const proyect = await Proyects.findByPk(id);
    if (!proyect) throw new Error('Proyecto no encontrado');

    await proyect.destroy();
    return { message: 'Proyecto eliminado correctamente' };
};

exports.getProyect = async (id) => {
    const proyect = await Proyects.findByPk(id, {
        include: [
            {
                model: user,
                as: 'users',
                attributes: ['id', 'name', 'email'],
                through: { attributes: [] }
            }
        ]
    });

    if (!proyect) throw new Error('Proyecto no encontrado');
    return proyect;
};
