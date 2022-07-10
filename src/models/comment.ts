import {DataTypes} from 'sequelize';
import db from '../db/db_connection';
import CommentTypes from '../interfaces/comment';
import Publication from './publication';
import User from './user';

const Comment = db.define<CommentTypes>("comment",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    publication_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Publication,
            key:'id'
        }
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    condition:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
},{
    tableName:"comment"
});

export default Comment;