import { Request,Response } from "express";
import { v4 } from "uuid";
import { idAnimal, idTypeAnimal } from "../helpers/id-model";
import RequestUserAuth from "../interfaces/RequestUserAuth";
import { Animal_type, Localization, Publication, User,Imgs_publication } from "../models";
import {v2} from 'cloudinary';
const cloudinary=v2;
cloudinary.config(process.env.CLOUDINARY_URL||"");

export const createPublication = async(req:RequestUserAuth,res:Response)=>{
    const {condition,animal_type,lng,lat, ...resto} = req.body;
    const array = req.files?.imgs as {tempFilePath:string};
    try {
        const animalType= await idAnimal(animal_type);
        const localization=await Localization.create({
            id:v4(),
            lng,
            lat
        });
        const publication = Publication.build({
            id:v4(),
            localization_id:localization.id,
            animal_id:animalType,
            user_id:req.user.id,
            ...resto
        });

        if(Array.isArray(array)){
            await publication.save();
            const tempPath = array.map(({tempFilePath})=>tempFilePath);
            tempPath.forEach(async(element)=>{
                let {secure_url} = await cloudinary.uploader.upload(element,{
                    folder: 'Publications'
                });
                await Imgs_publication.create({
                    id:v4(),
                    publication_id:publication.id,
                    url:secure_url
                });
            });
        }else{
            await publication.save();
            const {tempFilePath}=array;
            const {secure_url}= await cloudinary.uploader.upload(tempFilePath,{
                folder:'Publications'
            });

            await Imgs_publication.create({
                id:v4(),
                publication_id:publication.id,
                url:secure_url
            });
    
        }
        
        res.status(201).json({
            publication
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"hable con el administrador"
        })
    }
}

export const getPublications= async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    try {
        const publications= await Publication.findAll({
            where:{
                condition:true
            },
            include:[
                {
                    attributes:['lng','lat'],
                    model:Localization
                },
                {
                    attributes:['animal'],
                    model:Animal_type
                },
                {
                    attributes:['name1','name2','last_name1','last_name2','img',"id"],
                    model:User
                },
                {
                    attributes:['url'],
                    model:Imgs_publication
                }
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:publications.length,
            publications
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}

export const getPublicationsType= async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    const {type}= req.params;
    try {
        const publications= await Publication.findAll({
            where:{
                condition:true,
                animal_id:await idTypeAnimal(type)
            },
            include:[
                {
                    attributes:['lng','lat'],
                    model:Localization
                },
                {
                    attributes:['animal'],
                    model:Animal_type
                },
                {
                    attributes:['name1','name2','last_name1','last_name2','img'],
                    model:User
                },
                {
                    attributes:['url'],
                    model:Imgs_publication
                }
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:publications.length,
            publications
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}

export const getPublicationsUser= async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    const {userId}= req.params;
    try {
        const publications= await Publication.findAll({
            where:{
                condition:true,
                user_id:userId
            },
            include:[
                {
                    attributes:['lng','lat'],
                    model:Localization
                },
                {
                    attributes:['animal'],
                    model:Animal_type
                },
                {
                    attributes:['url'],
                    model:Imgs_publication
                }
            ],
            order:[['createdAt','DESC']],
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:publications.length,
            publications
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}

export const getPublication = async(req:Request,res:Response)=>{
    const {publicationId}=req.params;
    const publication = await Publication.findOne({
        where:{id:publicationId},
        include:[
            {
                attributes:['lng','lat'],
                model:Localization
            },
            {
                attributes:['animal'],
                model:Animal_type
            },
            {
                attributes:['name1','name2','last_name1','last_name2','img'],
                model:User
            },
            {
                attributes:['url'],
                model:Imgs_publication
            }
        ],
    });
    res.json({
        publication
    })
}

export const updatePublication = async(req:Request,res:Response)=>{
    const {publicationId} = req.params;
    const {id,condition,animal_type,lng,lat, ...resto} = req.body;
    try {
        if(animal_type){
            resto.animal_id= await idAnimal(animal_type);;
        }
        const publication = await Publication.findByPk(publicationId);

        if(lng || lat){
            const localization = await Localization.findByPk(publication!.localization_id);
            localization!.update({
                lng,
                lat
            })
        }
        
        await publication!.update(resto);
        res.json({
            publication
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }

}

export const deletPublication= async(req:Request,res:Response)=>{
    try {
        const {publicationId} = req.params;
        const publication = await Publication.findByPk(publicationId);
        
        publication!.update({condition:false});

        res.json({
            publication
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}

export const confirmAdoption = async(req:Request,res:Response)=>{
    const { publicationId } = req.params;
    const publicationAdopt = await Publication.findByPk(publicationId);
    
    publicationAdopt!.update({ isAdopt: true,condition:false });
    
    res.json({
        publicationAdopt,
    });
}

export const cancelAdoption = async(req:Request,res:Response)=>{
    const { publicationId } = req.params;
    const publicationAdopt = await Publication.findByPk(publicationId);
    
    //@ts-ignore
    publicationAdopt!.update({ isAdopt: null,condition:true });
    
    res.json({
        publicationAdopt,
    });
}