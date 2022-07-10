import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { User } from "../models";
import { generateJWT } from "../helpers/generate-jwt";
import RequestUserAuth from "../interfaces/RequestUserAuth";

export const login = async (req:Request,res:Response)=>{
    const {email, password}= req.body;
    try {

        //verificar si el email existe
       const user = await User.findOne({where:{email}}) 
       if(!user){
            return res.status(400).json({
                msg:`User / password wrong -  email`
            })
        }

        if(!user.condition){
            return res.status(400).json({
                msg: `User / password  wrong - condition: false`
            })
        }

        const validPasword = bcryptjs.compareSync(password,user.password);
        if(!validPasword){
            return res.status(400).json({
                msg: `User / password  wrong - password`
            })
        }

        const token = await generateJWT(user.id);
        return res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`talk to the administrator`
        })
    }
}

export const renovateJWT=async(req:RequestUserAuth,res:Response)=>{

    const user = req.user;
    const token = await generateJWT(user.id);

    res.json({
        user,
        token
    })
}