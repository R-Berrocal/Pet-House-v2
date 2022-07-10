import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import AdoptionTypes from '../interfaces/adoption';
import Publication from './publication';
import User from './user';

const Adoption = db.define<AdoptionTypes>("adoption",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    publication_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Publication,
            key:'id'
        }
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    condition:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
},{
    tableName:"adoption"
});

export default Adoption;