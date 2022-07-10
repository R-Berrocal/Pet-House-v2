import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import RequestUserAuth from '../interfaces/RequestUserAuth';
import TokenPayload from '../interfaces/tokenPayload';
import { User } from '../models';

export const validateJWT=async(req:RequestUserAuth,res:Response,next:any)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: "token is required"
        })
    }
    try {
        const {id} = jwt.verify(token,process.env.SECRETORPRIVATEKEY!) as TokenPayload;
        console.log(id);
        const user = await User.findByPk(id as string);
        if(!user){
            return res.status(401).json({
                msg:'Token is not valid - user not exist in db'
            })
        }

        if(!user.condition){
            return res.status(401).json({
                msg:"Token is not valid - user with condition: false"
            })
        }

        req.user=user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token is not valido"
        })
    }
}
