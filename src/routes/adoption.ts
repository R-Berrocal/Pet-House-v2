import { IRouter, Router } from "express";
import { check } from "express-validator";
import { createAdoption, deletAdoption, deletAdoptionRejected, getAdoptions, getConfirmAdoptions } from "../controllers/adoption";
import { adoptionIdExist, publicationIdExist } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateFiles } from "../middlewares/validate_files";
import { validateJWT } from "../middlewares/validate_jwt";


const router:IRouter=Router();

//Obtener adopciones
router.get('/',getAdoptions);

//Obtener adopciones confirmadas
router.get('/confirm',getConfirmAdoptions);

//crear una adopcion 
router.post("/",[
    validateJWT,
    check('name','The name is required').not().isEmpty(),
    check('publication_id','Not is uuid').isUUID(),
    check('publication_id').custom(publicationIdExist),
    validateFiles,
    validateFields
], createAdoption);

//Eliminar una adopcion
router.delete("/:adoptionId",[
    validateJWT,
    check('adoptionId','Is not uuid').isUUID(),
    check('adoptionId').custom(adoptionIdExist),
    validateFields
],deletAdoption);


//Eliminar permanentemente una adopcion rechazada
router.delete("/reject/:adoptionId",[
    validateJWT,
    check('adoptionId','Is not uuid').isUUID(),
    check('adoptionId').custom(adoptionIdExist),
    validateFields
  ],deletAdoptionRejected);
export default router;