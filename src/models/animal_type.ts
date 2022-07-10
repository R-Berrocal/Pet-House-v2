import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import animalTypes from '../interfaces/animal_type';


const Animal_type = db.define<animalTypes>("animal_type",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    animal:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true,
    }
},{
    tableName:"animal_type"
});

export default Animal_type;