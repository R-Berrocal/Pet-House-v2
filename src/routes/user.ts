import {IRouter,Router} from 'express';
import { createUser, deletUser, getUser, getUsers, updateUser } from '../controllers/user';
import {check} from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';
import { emailExist, isRoleValid, userIdExist } from '../helpers/db-validators';
import { validateJWT } from '../middlewares/validate_jwt';
import { haveRole, isAdminRole } from '../middlewares/validate_role';


const router:IRouter= Router();

router.get('/',[
    validateJWT,
    isAdminRole
],getUsers);

router.get('/:userId',[
    validateJWT,
    isAdminRole
],getUser);

router.post('/',[
    check('name1','name1 is required').not().isEmpty(),
    check('last_name1','last_name1 is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),
    check('email').custom(emailExist),
    check('password','The password must hace more than six characters').isLength({min:6}),
    check('role').custom(isRoleValid).optional(),
    validateFields
],createUser);

router.put('/:userId',[
    validateJWT,
    haveRole("ADMIN","USER"),
    check('userId','Is not uuid').isUUID(),
    check('userId').custom(userIdExist),
    check('role').custom(isRoleValid).optional(),
    validateFields
],updateUser);

router.delete('/:userId',[
    validateJWT,
    isAdminRole,
    check('userId','Is not uuid').isUUID(),
    check('userId').custom(userIdExist),
    validateFields
],deletUser);

export default router;