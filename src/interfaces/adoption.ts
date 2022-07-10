import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';

interface AdoptionTypes extends Model<InferAttributes<AdoptionTypes>,InferCreationAttributes<AdoptionTypes>>{
    id:string;
    publication_id:string;
    user_id:string;
    name:string;
    condition:boolean;
}

export default AdoptionTypes