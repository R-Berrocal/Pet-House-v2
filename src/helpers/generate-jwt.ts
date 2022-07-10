import jwt from 'jsonwebtoken';

export const generateJWT= (id:string)=>{
    return new Promise((resolve,reject)=>{
        const payload = {id};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY!,{
            expiresIn:"24h"
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("Couldn't generate token")
            }else{
                resolve(token);
            }
        })
    })
}