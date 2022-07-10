import { Request, Response } from "express";
import { v4 } from "uuid";
import RequestUserAuth from "../interfaces/RequestUserAuth";
import { Adoption, Imgs_adoption, Imgs_publication, Publication, User } from "../models";
import {v2} from 'cloudinary';
const cloudinary=v2;
cloudinary.config(process.env.CLOUDINARY_URL||"");


export const createAdoption = async (req:RequestUserAuth,res:Response)=>{
    const {condition,user_id, ...resto} = req.body;
    const array = req.files?.imgs as {tempFilePath:string};
    try {
        
        const adoption = Adoption.build({
            id:v4(),
            user_id:req.user.id,
            ...resto
        });
        await Publication.update({isAdopt:false},{where:{id:adoption.publication_id}});

        if(Array.isArray(array)){
            await adoption.save();
            const tempPath = array.map(({tempFilePath})=>tempFilePath);
            tempPath.forEach(async(element)=>{
                let {secure_url} = await cloudinary.uploader.upload(element,{
                    folder: 'Adoptions'
                });
                await Imgs_adoption.create({
                    id:v4(),
                    adoption_id:adoption.id,
                    url:secure_url
                });
            });
        }else{
            await adoption.save();
            const {tempFilePath}=array;
            const {secure_url}= await cloudinary.uploader.upload(tempFilePath,{
                folder:'Adoptions'
            });

            await Imgs_adoption.create({
                id:v4(),
                adoption_id:adoption.id,
                url:secure_url
            });
    
        }
        
        res.status(201).json({
            adoption
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"hable con el administrador"
        })
    }
}

export const getAdoptions = async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    try {
        const adoptions= await Adoption.findAll({
            where:{
                condition:true
            },
            include:[
                {
                    attributes:['title','description'],
                    model:Publication,
                    include:[{attributes:['url'], model:Imgs_publication}]
                },
                {
                    attributes:['name1','name2','last_name1','last_name2','img'],
                    model:User
                }
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:adoptions.length,
            adoptions
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}

export const getConfirmAdoptions = async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    try {
        const adoptions= await Adoption.findAll({
            where:{
                condition:false
            },
            include:[
                {
                    attributes:['title','description'],
                    model:Publication,
                    include:[{attributes:['url'], model:Imgs_publication}]
                },
                {
                    attributes:['name1','name2','last_name1','last_name2','img'],
                    model:User
                }
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:adoptions.length,
            adoptions
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}

export const deletAdoption= async(req:Request,res:Response)=>{
    try {
        const {adoptionId} = req.params;
        const adoption = await Adoption.findByPk(adoptionId);
        
        adoption!.update({condition:false});

        res.json({
            adoption
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}

export const deletAdoptionRejected= async(req:Request,res:Response)=>{
    try {
        const {adoptionId} = req.params;
        const adoption = await Adoption.destroy({where:{id:adoptionId}});

        res.json({
            adoption
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}