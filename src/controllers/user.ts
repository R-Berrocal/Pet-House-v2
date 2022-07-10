import { Request,Response } from 'express';
import bcryptjs from 'bcryptjs';
import {Role,User} from '../models';
import { v4 } from 'uuid';
import { generateJWT } from '../helpers/generate-jwt';
import {  idRole } from '../helpers/id-model';
import {v2} from 'cloudinary';
const cloudinary=v2;
cloudinary.config(process.env.CLOUDINARY_URL||"");

export const createUser = async(req:Request,res:Response)=>{
    const {body} = req;
    try {
        const role= await idRole(body.role);
        const array = req.files?.img as {tempFilePath:string};
        const user=  User.build({
            id:v4(),
            role_id:role,
            ...body
        });
        
        //encriptar contraseña 
        const salt  = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(body.password,salt);
        
        //subida de archivos
        if(array){
            const {tempFilePath}=array;
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath,{
                folder:'Users'
            });
            user.img=secure_url;
        }
        
        //guardar en DB
        await user.save();
        const token = await generateJWT(user.id);
        return res.status(201).json({
            user,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"hable con el administrador"
        })
    }
}

export const getUsers= async(req:Request,res:Response)=>{
    const {offset=0,limit=10} = req.query;
    try {
        const users= await User.findAll({
            where:{
                condition:true
            },
            include:{
                attributes:['role'],
                model:Role
            },
            offset:parseInt(offset as string),
            limit:parseInt(limit as string)
        });
        res.json({
            count:users.length,
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}

export const getUser = async(req:Request,res:Response)=>{
    const {userId} = req.params;
    try {
        const user = await User.findOne({
            where:{id:userId},
            include:{
                attributes:['role'],
                model:Role
            }
        })
        if(!user){
            return res.status(400).json({
                msg:`id user not exist in db`
            })
        }
    
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    

}
export const updateUser = async(req:Request,res:Response)=>{
    const {userId} = req.params;
    const {id,password,email,role, ...resto}=req.body;
    try {
        const array = req.files?.img as {tempFilePath:string};
        if(password){
            const salt = bcryptjs.genSaltSync();
            resto.password= bcryptjs.hashSync(password,salt);
        }
        if(role){
            const roleId= await idRole(role);
            resto.role_id=roleId;
        }
        
        const user = await User.findByPk(userId);
        if(array){
            console.log(user?.img);
            if(user?.img){
                const  nombreArr=user!.img?.split("/");
                const nombre = nombreArr[nombreArr.length-1];
                const [public_id]= nombre.split(".")
                cloudinary.uploader.destroy("Users/"+public_id);
            }
            const {tempFilePath}=array;
            const {secure_url}= await cloudinary.uploader.upload(tempFilePath,{
                    folder:"Users"
            })
            resto.img=secure_url;
        }
        await user!.update(resto);
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }

}

export const deletUser= async(req:Request,res:Response)=>{
    try {
        const {userId} = req.params;
        const user = await User.findByPk(userId);
        
        user!.update({condition:false});

        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
    
}