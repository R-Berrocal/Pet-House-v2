import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import ImgsAdoptionTypes from '../interfaces/imgs_adoption';
import Adoption from './adoption';


const Imgs_adoption = db.define<ImgsAdoptionTypes>("imgs_adoption",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    adoption_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Adoption,
            key:'id'
        }
    },
    url:{
        type:DataTypes.STRING
    }
},{
    tableName:"imgs_adoption"
});

export default Imgs_adoption;