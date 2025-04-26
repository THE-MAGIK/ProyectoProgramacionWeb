// Importa los modelos de la base de datos
const User = require('./user.model');
const Proyect = require('./proyects.model');
const UserProyect = require('./users_proyects.model');

// Relación muchos a muchos entre User y Proyect a través de UserProyect
User.belongsToMany(Proyect, { 
    through: UserProyect,           // Tabla intermedia
    foreignKey: 'user_id',          // Clave foránea en la tabla intermedia que apunta al usuario
    as: 'userproyects'              // Alias para acceder a los proyectos de un usuario
});

Proyect.belongsToMany(User, { 
    through: UserProyect,           // Tabla intermedia
    foreignKey: 'proyect_id',       // Clave foránea en la tabla intermedia que apunta al proyecto
    as: 'proyectusers'              // Alias para acceder a los usuarios de un proyecto
});

// Relación uno a muchos: un proyecto pertenece a un administrador (que es un usuario)
Proyect.belongsTo(User, { 
    foreignKey: 'administrator_id', // Clave foránea que apunta al administrador del proyecto
    as: 'administrator'             // Alias para acceder al administrador desde el proyecto
});

// Exporta los modelos para usarlos en otras partes del proyecto
module.exports = { User, Proyect, UserProyect };
