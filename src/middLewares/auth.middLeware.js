// Importa jsonwebtoken para verificar el token y dotenv para leer variables de entorno
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Llave secreta almacenada en el archivo .env
const KEY = process.env.JWT_SECRET;

// Middleware para autenticar al usuario mediante el token JWT
const authenticateToken = (req, res, next) => {
    // Obtiene el token del encabezado Authorization, usualmente en formato "Bearer <token>"
    const token = req.header('Authorization')?.split(' ')[1];

    // Si no hay token, deniega el acceso
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    // Verifica que el token sea válido
    jwt.verify(token, KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' }); // Token inválido
        }
        req.user = user; // Adjunta la info del usuario al request
        next(); // Continúa al siguiente middleware o controlador
    });
};

// Middleware para verificar si el usuario tiene un rol autorizado
const checkRol = (rols) => {
    return (req, res, next) => {
        // Verifica si el rol del usuario está incluido en la lista de roles permitidos
        if (!rols.includes(req.user.rol_id)) {
            return res.status(403).json({ message: 'Acceso denegado, rol no autorizado' });
        }
        next(); // Usuario autorizado, continúa
    };
};

// Exporta los middlewares para usarlos en las rutas
module.exports = { authenticateToken, checkRol };
