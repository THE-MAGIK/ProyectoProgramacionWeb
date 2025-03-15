const user = requiere('../model/user.model');
const bcrypt = requiere('bcryptjs');

exports.creatUser = async (name, email, password, rol_id, administrator_id) => {
    try{
        const userExists = await user.findOne({where : { email }}); 
        if (userExists){
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            rol_id,
            administrator_id
        });

        return newUser;
    }catch(err){
        throw new Error('Error al crear el usuario: ${err.message}');
    }
};

exports.getAllUsersByRolId = async (rol_id) => {
    try {
        const users= await user.findAll({where: { rol_id },attributes: { exclude: [ 'password' ] }});
        return users;
    } catch(err){
        throw new Error('Error al obtener los usuarios: ${err.message}');
    }
};

exports.updateUsers = async (id, name, email, rol_id, administrator_id, admin_from_token) => {
    try {
        const user = await UserActivation.findByPk(id);
        if (user.administrator_id !== admin_from_token){
            throw new Error ('Acceso denegado, este usuario no esta bajo su administracion');
        }

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== user.email){
            const userExists = await User.findOne({ where: { email } });
            if (userExists){
                throw new Error('El email ya esta en uso');
            };
        }
        await user.update({
            name,
            email,
            rol_id,
            administrator_id
        });

        return user;
    }catch (err) {
        throw new Error('Error al actualizar el usuario: ${err.message}');
    }
};

exports.deleteUsers = async (id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);
        if (user.administrator_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no esta bajo su administracion');
        }

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await user.destroy();
        return {message: 'Usuario eliminado con exito'};
    }catch (err){
        throw new Error('Error al eliminar el usuario: ${err.message}');
    }
};