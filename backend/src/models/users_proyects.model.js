// Importa DataTypes desde Sequelize
const { DataTypes } = require('sequelize'); 

// Importa la conexión a la base de datos desde el archivo de configuración 
const sequalize = require('../config/database'); 

// Define el modelo 'users_proyects' en Sequelize
const users_proyects = sequalize.define('users_proyects', {

    // Define la columna 'id' como clave primaria, entera y autoincremental 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    // Define la columna 'user_id' como clave foránea referenciada a 'users'
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'users', key: 'id' } 
    },

    // Define la columna 'proyect_id' como clave foránea referenciada a 'proyects'
    proyect_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'proyects', key: 'id' } 
    }

}, {
    // Desactiva las marcas de tiempo automáticas en Sequelize
    timestamps: false, 

    // Define el nombre de la tabla en la base de datos
    tableName: 'users_proyects',
});

// Exporta el modelo 'users_proyects' 
module.exports = users_proyects;
