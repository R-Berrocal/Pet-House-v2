import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import RoleTypes from '../interfaces/role';


const Role = db.define<RoleTypes>("role",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    role:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:true
    }
},{
    tableName:"role"
});



export default Role;