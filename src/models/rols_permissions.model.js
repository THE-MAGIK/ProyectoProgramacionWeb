const {DataTypes} = requiere ('sequializer');
const sequalize= requiere ('../config/database');

const rols_permissions = sequalize.define('rols_permissions',{
    id: { type:Datatype.INTEGER, primarykey:true, autoIncrement:true},
    rol_id: {
        type:Datatype.INTEGER,
        allowNull:false,
        reference: {model:'rols_permissions', key:'id'}
    },
    permission_id: {
        type:Datatype.INTEGER,
        allowNull:false,
        references:{model:'permissions', key: 'id'} 
    }

},{
    timestamps:false,
    tableName:'rols_permissions',
});

Module.exports = rols_permissions;