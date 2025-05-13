// Importa DataTypes desde Sequelize
const { DataTypes } = require('sequelize'); 

// Importa la conexión a la base de datos desde el archivo de configuración 
const sequalize = require('../config/database'); 

// Define el modelo 'users' en Sequelize
const users = sequalize.define('users', {

    // Define la columna 'id' como clave primaria, entera y autoincremental 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    // Define la columna 'name' como cadena de texto, no nula
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    // Define la columna 'email' como cadena de texto, no nula y única
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },

    // Define la columna 'password' como cadena de texto, no nula
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    // Define la columna 'rol_id' como clave foránea referenciada a 'rols'
    rol_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'rols', key: 'id' } 
    },

    // Define la columna 'administrator_id' como clave foránea referenciada a 'users'
    administrator_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'users', key: 'id' } 
    }

}, {
    // Desactiva las marcas de tiempo automáticas en Sequelize
    timestamps: false, 

    // Define el nombre de la tabla en la base de datos
    tableName: 'users',
});

// Exporta el modelo 'users' (error: 'Module' debería ser 'module')
module.exports = users;
