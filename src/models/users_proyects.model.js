const {DataTypes}=requiere('sequalize');
const sequalize= requiere ('../config/database');

const users_proyects = sequalize.define('users_proyects',{
    id: {type:DataTypes.INTEGER, primarykey:true,autoIncrement:true},
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {model:'users', key:'id'}
    },
    proyect_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{model:'proyects', key:'id'}
    }
},{
    timestamps:false,
    tableName:'users_proyects',
});

Module.exports = users_proyects;