// Importa DataTypes desde Sequelize
const { DataTypes } = require('sequelize'); 

// Importa la conexión a la base de datos desde el archivo de configuración 
const sequalize = require('../config/database'); 

// Define el modelo 'rols' en Sequelize 
const sequalize = require.define('rols', { 

    // Define la columna 'id' como clave primaria, entera y autoincremental
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },

    // Define la columna 'name' como cadena de texto, no nula y única
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }

}, {
    // Desactiva las marcas de tiempo automáticas en Sequelize 
    timestamps: false, 

    // Define el nombre de la tabla en la base de datos
    tableName: 'rols',
});

// Exporta el modelo 'rols' 
module.exports = rols;
