import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';

interface ImgsAdoptionTypes extends Model<InferAttributes<ImgsAdoptionTypes>,InferCreationAttributes<ImgsAdoptionTypes>>{
    id:string;
    adoption_id:string;
    url:string;
}

export default ImgsAdoptionTypes;