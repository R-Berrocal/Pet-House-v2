import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import LocalizationTypes from '../interfaces/localization';


const Localization = db.define<LocalizationTypes>("localization",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    lng:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    lat:{
        type:DataTypes.STRING(100)
    }
},{
    tableName:"localization"
});

export default Localization;