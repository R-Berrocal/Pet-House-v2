import { Request, Response } from "express";


export const validateFiles=(req:Request,res:Response,next:any)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({msg:'There are no files to upload'});
    }
    next();
}

