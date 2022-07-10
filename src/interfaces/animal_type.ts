import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';

interface animalTypes extends Model<InferAttributes<animalTypes>,InferCreationAttributes<animalTypes>>{
    id:string;
    animal:string;
}

export default animalTypes