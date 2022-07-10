import { Response } from "express";
import RequestUserAuth from "../interfaces/RequestUserAuth";
import { Role } from "../models";


export const isAdminRole=async (req:RequestUserAuth,res:Response,next:any)=>{
    
    if(!req.user){
        return res.status(500).json({
            msg: "You want to verify the role without validating the token first" 
        });
        
    }
    
    const {role_id,name1}=req.user;
    const role = await Role.findByPk(role_id);
    if(role!.role!=="ADMIN"){
        return res.status(401).json({
            msg:`${name1} you are not ADMIN - you cannot do this `
        });
    }

    next();
}

export const haveRole = (...roles:string[])=>{
    return async (req:RequestUserAuth,res:Response,next:any)=>{
        if(!req.user){
            return res.status(500).json({
               msg: "Se quiere verificar el role sin validar el token primero" 
            });
        
        }

        const {role_id}=req.user;
        const role = await Role.findByPk(role_id);
        if(!roles.includes(role!.role)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}