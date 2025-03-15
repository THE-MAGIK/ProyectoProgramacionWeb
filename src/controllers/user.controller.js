const userService = requiere('../services/user.service');

exports.createUser = async (req, res) => {
    try {
        const {name, email, password, rol_id, administrator_id} = req.body;
        const newUser = await userService.createUser(name, email, password, rol_id, administrator_id);
        res.status(200).json ({ message:'Usuario creado con exito', user: newUser });
    }catch(err){
        res.status(500).json ({ message: err.mesagge });
    }
};

exports.getAllUsersByAdministratorId = async (req,res) => {
    try{
        const admin_from_token = req.user.id;
        const { email } = req.query;
        const users = await userService.getAllUsersByAdministratorId(admin_from_token, email);
        res.status(200).json({ mesagge : 'Usuarios consultados con exito',users});
    } catch (error){
        res.status(500).json({ mesagge:'Error al obtener usuarios',error});
    }
};

exports.getAllUsersByRolId = async (req, res)=> {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id);
        res.status(200).json({mesagge: 'Usuarios consultados con exito',users });
    }catch (error){
        res.status(500).json({ mesagge: 'Error al obtener los usuarios', error });
    }
};

exports.updateUser = async (req,res) => {
    const {id} = req.params;
    const {name,email,rol_id,administrator_id} = req.body;
    const admin_from_token = req.user.id;
    try {
        const user= await userService.updateUser(id, name, email, rol_id, administrator_id, admin_from_token);
        res.status(200).json({ message: 'Usuario actualizado con exito'});
    }catch (error) {
        res.status(500).json({message : error.mesagge});
    }
};

exports.deleteUsers = async (req, res)=> {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    try{
        const result = await userService.deleteUsers(id,admin_from_token);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message:err.mesagge});
    }
};