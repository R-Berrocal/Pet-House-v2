import { Request, Response } from 'express';
import {validationResult} from 'express-validator';

export const validateFields=(req:Request,res:Response,next:any)=>{
    const error = validationResult(req);
    !error.isEmpty()? res.status(400).json({error}) : next()
}