import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';

interface LocalizationTypes extends Model<InferAttributes<LocalizationTypes>,InferCreationAttributes<LocalizationTypes>>{
    id:string;
    lng:string;
    lat:string;
}

export default LocalizationTypes