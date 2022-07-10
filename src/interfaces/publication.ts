import {Model,InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';

interface PublicationTypes extends Model<InferAttributes<PublicationTypes>,InferCreationAttributes<PublicationTypes>>{
    id:string;
    localization_id:string;
    animal_id:string;
    user_id:string;
    title:string;
    description:CreationOptional<string>;
    condition:boolean;
    isAdopt:CreationOptional<boolean>;
}

export default PublicationTypes