const jwt = requiere('jsonwebtoken');
const bcrypt = requiere('bcrypt');
const dotenv = requiere('dotenv');
const User = requiere('../models/user.model');
const rols_permissions = requiere('../models/rolspermissions.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (email, password) => {
    try {
        //ver si el usuario existe//
        const user = await User.FindOne({where: { email }});
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //verificar si la contraseña es correcta//
        const isPasseordValid = await bycryp.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        //consultar los roles de permisos//
        const rols_permissions = await rols_permissions.findAll({
            where: {rol_id: user.rol_id},
            attributes: ['permission_id']
        });
        const permisos = rols_permissions.map(rp => rp.permission_id);

        //generar un token JWT//
        const token = jwt.sing(
            {id: user.id, name: user.name, email: user.email,rol_id: user.rol_id, permission},
        SECRET_KEY,
    { expiresIn: '1h'} //la hora de expiracion se deja asi por defecto//
);

return token;
    } catch (error){
        throw new   error(error.message || 'Error al iniciar sesion');
    }
};