// Importa DataTypes desde Sequelize 
const { DataTypes } = require('sequelize'); 

// Importa la conexión a la base de datos desde el archivo de configuración 
const sequalize = require('../config/database'); 

// Define el modelo 'rols_permissions' en Sequelize
const rols_permissions = sequalize.define('rols_permissions', {

    // Define la columna 'id' como clave primaria, entera y autoincremental
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },

    // Define la columna 'rol_id' como clave foránea referenciada a 'rols_permissions' 
    rol_id: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: { model: 'rols_permissions', key: 'id' }
    },

    // Define la columna 'permission_id' como clave foránea referenciada a 'permissions'
    permission_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'permissions', key: 'id' } 
    }

}, {
    // Desactiva las marcas de tiempo automáticas en Sequelize
    timestamps: false, 

    // Define el nombre de la tabla en la base de datos
    tableName: 'rols_permissions',
});

// Exporta el modelo 'rols_permissions' 
module.exports = rols_permissions;
