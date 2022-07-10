import {Model,InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';

interface UserTypes extends Model<InferAttributes<UserTypes>,InferCreationAttributes<UserTypes>>{
    id:string;
    role_id:string;
    name1:string;
    name2:CreationOptional<string>;
    last_name1:string;
    last_name2:CreationOptional<string>;
    email:string;
    password:string;
    condition:boolean;
    img:CreationOptional<string>;
}

export default UserTypes