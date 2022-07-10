import { Request, Response } from "express";
import { v4 } from "uuid";
import RequestUserAuth from "../interfaces/RequestUserAuth";
import { Comment, Publication, User } from "../models";


export const createComment = async(req:RequestUserAuth,res:Response)=>{
    const {publication_id,...resto} = req.body;
    try {       
        const comment = Comment.build({
            id:v4(),
            publication_id,
            user_id:req.user.id,
            ...resto
        });
        
        await comment.save();
        res.status(201).json({
            comment
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"hable con el administrador"
        });
    }
}

export const getComments = async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    try {
        const comments= await Comment.findAll({
            where:{
                condition:true
            },
            include:[
                {
                    attributes:['id','title'],
                    model:Publication
                },
                {
                    attributes:['name1','name2','last_name1','last_name2','img'],
                    model:User
                },
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:comments.length,
            comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        });
    }
}

export const getCommentsUser = async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    const {userId}=req.params;
    try {
        const comments= await Comment.findAll({
            where:{
                condition:true,
                user_id:userId
            },
            include:[
                {
                    attributes:['id','title'],
                    model:Publication
                },
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:comments.length,
            comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        });
    }
}

export const getCommentsPublication = async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    const {publicationId}=req.params;
    try {
        const comments= await Comment.findAll({
            where:{
                condition:true,
                publication_id:publicationId
            },
            include:[
                {
                    attributes:['name1','name2','last_name1','last_name2','img'],
                    model:User
                },
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:comments.length,
            comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        });
    }
}

export const getComment = async(req:Request,res:Response)=>{
    const {commentId}=req.params;
    try {
        const comment = await Comment.findOne({
            where:{id:commentId},
            include:[
                {
                    attributes:['id','title'],
                    model:Publication
                },
                {
                    attributes:['name1','name2','last_name1','last_name2','img'],
                    model:User
                }
            ]
        });
    
        res.json({
            comment
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        });
    }
}

export const updateComment = async(req:Request,res:Response) => {
    const {commentId} = req.params;
    const {id, publication_id, user_id, ...resto} = req.body;
    try {
        const comment = await Comment.findByPk(commentId);
        
        await comment!.update(resto);
        res.json({
            comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        });
    }
}

export const deleteComment = async(req:Request,res:Response)=>{
    const {commentId} = req.params;
    try {
        const comment = await Comment.findByPk(commentId);
        
        await comment!.update({condition:false});
        res.json({
            comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        });
    }
}

