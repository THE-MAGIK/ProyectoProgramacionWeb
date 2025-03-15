const {DataTypes } = requiere ('sequalize');
const sequalize = requiere ('../config/database');

const users = sequalize.define('users', {
    id: { type: DataTypes.INTEGER, primarykey: true,autoIncrement: true },
    name: {type:DataTypes.STRING, allowNull:false},
    email: {type:DataTypes.STRING,allowNull:false,unique:true},
    password: {type: DataTypes.STRING,allowNull:false},
    rol_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {model: 'rols', key: 'id'}
    },
    administrator_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{model:'users', key:'id'}
    }
}, {
    timestamps:false,
    tableName: 'users',
});

Module.exports = users;