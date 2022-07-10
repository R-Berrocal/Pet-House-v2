import {Model,InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';

interface RoleTypes extends Model<InferAttributes<RoleTypes>,InferCreationAttributes<RoleTypes>>{
    id:string;
    role:string;
}

export default RoleTypes