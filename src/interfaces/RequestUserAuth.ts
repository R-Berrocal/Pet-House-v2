import { Request } from "express";
import { User } from "../models";
interface RequestUserAuth extends Request {
    user?: any;
}

export default RequestUserAuth;