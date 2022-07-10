import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';

interface ImgsPublicationTypes extends Model<InferAttributes<ImgsPublicationTypes>,InferCreationAttributes<ImgsPublicationTypes>>{
    id:string;
    publication_id:string;
    url:string;
}

export default ImgsPublicationTypes;