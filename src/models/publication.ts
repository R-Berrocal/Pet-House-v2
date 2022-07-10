import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import PublicationTypes from '../interfaces/publication';
import Animal_type from './animal_type';
import Localization from './localization';
import User from './user';



const Publication = db.define<PublicationTypes>("publication",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    localization_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Localization,
            key:'id'
        },
    },
    animal_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Animal_type,
            key:'id'
        },
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        },
    },
    title:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
    },
    condition:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    isAdopt:{
        type:DataTypes.BOOLEAN,
        defaultValue:null
    }
},{
    tableName:"publication"
});



export default Publication;