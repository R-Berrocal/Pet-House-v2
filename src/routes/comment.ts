import { IRouter, Router } from "express";
import { check } from "express-validator";
import { createComment, deleteComment, getComment, getComments, getCommentsPublication, getCommentsUser, updateComment } from "../controllers/comment";
import { commentIdExist, publicationIdExist, userIdExist } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";


const router:IRouter= Router();

//Obtener comentarios
router.get('/',getComments);

//Obtener comentarios del usuario
router.get('/user/:userId',[
    check('userId','Is not uuid').isUUID(),
    check('userId').custom(userIdExist),
    validateFields
], getCommentsUser);

//Obtener comentarios de la publicacion
router.get('/publication/:publicationId',[
  check('publicationId','Is not uuid').isUUID(),
  check('publicationId').custom(publicationIdExist),
  validateFields
], getCommentsPublication);

//Obtener comentario por id
router.get('/:commentId',[
  check('commentId','Is not uuid').isUUID(),
  check('commentId').custom(commentIdExist),
  validateFields
], getComment);

//Crear comentarios
router.post('/',[
    validateJWT,
    check('description','The description is required').not().isEmpty(),
    check('publication_id','Is not uuid').isUUID(),
    check('publication_id').custom(publicationIdExist),
    validateFields
], createComment);

//Actualizar comentarios
router.put('/:commentId',[
  validateJWT,
  check('description','The description is required').not().isEmpty(),
  check('commentId','Is not uuid').isUUID(),
  check('commentId').custom(commentIdExist),
  validateFields
], updateComment);

//Eliminar comentarios
router.delete('/:commentId',[
  validateJWT,
  check('commentId','Is not uuid').isUUID(),
  check('commentId').custom(commentIdExist),
  validateFields
], deleteComment);
export default router;
