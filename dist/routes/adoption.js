"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const adoption_1 = require("../controllers/adoption");
const db_validators_1 = require("../helpers/db-validators");
const validate_fields_1 = require("../middlewares/validate_fields");
const validate_files_1 = require("../middlewares/validate_files");
const validate_jwt_1 = require("../middlewares/validate_jwt");
const router = (0, express_1.Router)();
//Obtener adopciones
router.get('/', adoption_1.getAdoptions);
//Obtener adopciones confirmadas
router.get('/confirm', adoption_1.getConfirmAdoptions);
//crear una adopcion 
router.post("/", [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('publication_id', 'Not is uuid').isUUID(),
    (0, express_validator_1.check)('publication_id').custom(db_validators_1.publicationIdExist),
    validate_files_1.validateFiles,
    validate_fields_1.validateFields
], adoption_1.createAdoption);
//Eliminar una adopcion
router.delete("/:adoptionId", [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('adoptionId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('adoptionId').custom(db_validators_1.adoptionIdExist),
    validate_fields_1.validateFields
], adoption_1.deletAdoption);
//Eliminar permanentemente una adopcion rechazada
router.delete("/reject/:adoptionId", [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('adoptionId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('adoptionId').custom(db_validators_1.adoptionIdExist),
    validate_fields_1.validateFields
], adoption_1.deletAdoptionRejected);
exports.default = router;
//# sourceMappingURL=adoption.js.map