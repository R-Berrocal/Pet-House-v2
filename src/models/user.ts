import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import UserTypes from '../interfaces/user';
import Role from './role';


const User = db.define<UserTypes>("user",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    role_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Role,
            key:'id'
        },
        defaultValue:'9e5e2e6c-fcea-11ec-b29b-803049704764'
    },
    name1:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    name2:{
        type:DataTypes.STRING(50),
    },
    last_name1:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    last_name2:{
        type:DataTypes.STRING(50),
    },
    email:{
        type:DataTypes.STRING(100),
        unique:true,
        allowNull:false,
        
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    condition:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    img:{
        type:DataTypes.STRING
    }
},{
    tableName:"user"
});



export default User;