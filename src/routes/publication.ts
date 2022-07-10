import { IRouter, Router } from "express";
import { check } from "express-validator";
import {
     cancelAdoption, 
     confirmAdoption, 
     createPublication, 
     deletPublication, 
     getPublication, 
     getPublications, 
     getPublicationsType, 
     getPublicationsUser, 
     updatePublication
     } from "../controllers/publication";
import { isAnimalValid, publicationIdExist, userIdExist } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateFiles } from "../middlewares/validate_files";
import { validateJWT } from "../middlewares/validate_jwt";
import { isAdminRole } from "../middlewares/validate_role";


const router:IRouter= Router();

//Obtener todas las publicaciones
router.get('/',getPublications);

//Obtener publicaciones por el tipo de animal
router.get('/animal_Type/:type',getPublicationsType);

//Obtener publicaciones de usuario
router.get('/user/:userId',[
    check('userId','Is not uuid').isUUID(),
    check('userId').custom(userIdExist),
    validateFields
],getPublicationsUser);

//Obtener publicacion por id
router.get("/:publicationId",[
    check("publicationId","Is not uuid").isUUID(),
    check("publicationId").custom(publicationIdExist),
    validateFields
  ],getPublication );

//crear una publicacion - privado -  cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('title','title is required').not().isEmpty(),
    check('animal_type').custom(isAnimalValid),
    check('lng','lng is required').not().isEmpty(),
    check('lat','lat is required').not().isEmpty(),
    validateFiles,
    validateFields
],createPublication);


//Actualizar una publicacion
router.put('/:publicationId',[
    validateJWT,
    check('publicationId','Is not uuid').isUUID(),
    check('publicationId').custom(publicationIdExist),
    check('animal_type').custom(isAnimalValid).optional(),
    validateFields
],updatePublication);

//Eliminar una publicacion
router.delete("/:publicationId",[
    validateJWT,
    isAdminRole,
    check("publicationId","Is not uuid").isUUID(),
    check("publicationId").custom(publicationIdExist),
    validateFields
],deletPublication);

//confirmar adopcion y eliminar publicacion
router.put("/adopt/:publicationId",[
    validateJWT,
    isAdminRole,
    check("publicationId","Is not uuid").isUUID(),
    check("publicationId").custom(publicationIdExist),
    validateFields
],confirmAdoption);

//cancelar adopcion y activar publicacion
  router.put("/cancelAdopt/:publicationId",[
    validateJWT,
    isAdminRole,
    check("publicationId","Is not uuid").isUUID(),
    check("publicationId").custom(publicationIdExist),
    validateFields
  ],cancelAdoption);

export default router;