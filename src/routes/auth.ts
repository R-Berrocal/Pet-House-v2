import { IRouter, Router } from "express";
import { check } from "express-validator";
import { login, renovateJWT } from "../controllers/auth";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const router:IRouter = Router();

router.get('/',[
    validateJWT,
    validateFields
],renovateJWT);

router.post('/login',[
    check('email','email is not valid').isEmail(),
    check('password','password is required').not().isEmpty(),
    validateFields
],login);

export default router;