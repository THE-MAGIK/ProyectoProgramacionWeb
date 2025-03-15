const {DataTypes} = require ('sequalize');
const sequalize = requiere.define('permissions',{
    id: {type:DataTypes.INTEGER, primarykey:true,autoIncrement:ture},
    name: {type:DataTypes.STRING, allowNull:false,unique:true}
},{
    timestamp:false,
    tableName:'permissions',
});

Module.exports = permissions;