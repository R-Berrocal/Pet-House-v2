import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import ImgsPublicationTypes from '../interfaces/imgs_publication';
import Publication from './publication';


const Imgs_publication = db.define<ImgsPublicationTypes>("imgs_publication",{
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
    url:{
        type:DataTypes.STRING
    }
},{
    tableName:"imgs_publication"
});

export default Imgs_publication;