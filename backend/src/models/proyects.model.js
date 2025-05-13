// Importa DataTypes desde Sequelize 
const { DataTypes } = require('sequelize'); 

const User = require('./user.model'); // Ajusta la ruta si es necesario


// Importa la conexión a la base de datos desde el archivo de configuración 
const sequelize = require('../config/database'); 

// Define el modelo 'proyects' en Sequelize
const proyects = sequelize.define('proyects', {

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

    // Define la columna 'description' como un texto, no nulo
    description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },

    // Define la columna 'date_create' como fecha con valor por defecto en el momento de creación
    date_create: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    },

    // Define la columna 'administrator_id' como clave foránea referenciada a la tabla 'users'
    administrator_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'users', key: 'id' }
    }

}, {
    // Desactiva las marcas de tiempo automáticas en Sequelize 
    timestamps: false, 

    // Define el nombre de la tabla en la base de datos
    tableName: 'proyects', 

    // Hook que se ejecuta después de crear un proyecto para ajustar la zona horaria
    hooks: {
        afterCreate: (project, opcions) => { 
            if (project.date_create) {
                project.date_create.setHours(project.date_create.getHours() - 5);
            }
        }
    }
});


// Exporta el modelo 'proyects' 
module.exports = proyects; 
