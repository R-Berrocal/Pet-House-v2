"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const publication_1 = require("../controllers/publication");
const db_validators_1 = require("../helpers/db-validators");
const validate_fields_1 = require("../middlewares/validate_fields");
const validate_files_1 = require("../middlewares/validate_files");
const validate_jwt_1 = require("../middlewares/validate_jwt");
const validate_role_1 = require("../middlewares/validate_role");
const router = (0, express_1.Router)();
//Obtener todas las publicaciones
router.get('/', publication_1.getPublications);
//Obtener publicaciones por el tipo de animal
router.get('/animal_Type/:type', publication_1.getPublicationsType);
//Obtener publicaciones de usuario
router.get('/user/:userId', [
    (0, express_validator_1.check)('userId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('userId').custom(db_validators_1.userIdExist),
    validate_fields_1.validateFields
], publication_1.getPublicationsUser);
//Obtener publicacion por id
router.get("/:publicationId", [
    (0, express_validator_1.check)("publicationId", "Is not uuid").isUUID(),
    (0, express_validator_1.check)("publicationId").custom(db_validators_1.publicationIdExist),
    validate_fields_1.validateFields
], publication_1.getPublication);
//crear una publicacion - privado -  cualquier persona con un token valido
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('title', 'title is required').not().isEmpty(),
    (0, express_validator_1.check)('animal_type').custom(db_validators_1.isAnimalValid),
    (0, express_validator_1.check)('lng', 'lng is required').not().isEmpty(),
    (0, express_validator_1.check)('lat', 'lat is required').not().isEmpty(),
    validate_files_1.validateFiles,
    validate_fields_1.validateFields
], publication_1.createPublication);
//Actualizar una publicacion
router.put('/:publicationId', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('publicationId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('publicationId').custom(db_validators_1.publicationIdExist),
    (0, express_validator_1.check)('animal_type').custom(db_validators_1.isAnimalValid).optional(),
    validate_fields_1.validateFields
], publication_1.updatePublication);
//Eliminar una publicacion
router.delete("/:publicationId", [
    validate_jwt_1.validateJWT,
    validate_role_1.isAdminRole,
    (0, express_validator_1.check)("publicationId", "Is not uuid").isUUID(),
    (0, express_validator_1.check)("publicationId").custom(db_validators_1.publicationIdExist),
    validate_fields_1.validateFields
], publication_1.deletPublication);
//confirmar adopcion y eliminar publicacion
router.put("/adopt/:publicationId", [
    validate_jwt_1.validateJWT,
    validate_role_1.isAdminRole,
    (0, express_validator_1.check)("publicationId", "Is not uuid").isUUID(),
    (0, express_validator_1.check)("publicationId").custom(db_validators_1.publicationIdExist),
    validate_fields_1.validateFields
], publication_1.confirmAdoption);
//cancelar adopcion y activar publicacion
router.put("/cancelAdopt/:publicationId", [
    validate_jwt_1.validateJWT,
    validate_role_1.isAdminRole,
    (0, express_validator_1.check)("publicationId", "Is not uuid").isUUID(),
    (0, express_validator_1.check)("publicationId").custom(db_validators_1.publicationIdExist),
    validate_fields_1.validateFields
], publication_1.cancelAdoption);
exports.default = router;
//# sourceMappingURL=publication.js.map