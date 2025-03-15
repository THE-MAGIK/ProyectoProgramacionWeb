const {DataTypes } = requiere ('sequalize');
const sequalize = requiere ('../config/database');

const proyects = sequalize.define('proyects', {
    id: {type: DataTypes.INTEGER, primarykey:true, autoincrement:true},
    name: {type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.TEXT,allowNull:false},
    date_create :{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    administrator_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{model:'users',key :'id'}
    }

},{
    timestamp:false,
    tableName:'proyects',
    hooks:{
        afterCreate:(project,opcions)=> {
            if (project.date_create){
                project.date_create.setHours(project.date_create.getHours() - 5);
            }
        }
    }
});

Module.exports = proyects;