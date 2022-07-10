import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';

interface CommentTypes extends Model<InferAttributes<CommentTypes>,InferCreationAttributes<CommentTypes>>{
    id:string;
    publication_id:string;
    user_id:string;
    description:string;
    condition:boolean;
}

export default CommentTypes