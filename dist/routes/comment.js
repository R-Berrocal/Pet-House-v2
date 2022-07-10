"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const comment_1 = require("../controllers/comment");
const db_validators_1 = require("../helpers/db-validators");
const validate_fields_1 = require("../middlewares/validate_fields");
const validate_jwt_1 = require("../middlewares/validate_jwt");
const router = (0, express_1.Router)();
//Obtener comentarios
router.get('/', comment_1.getComments);
//Obtener comentarios del usuario
router.get('/user/:userId', [
    (0, express_validator_1.check)('userId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('userId').custom(db_validators_1.userIdExist),
    validate_fields_1.validateFields
], comment_1.getCommentsUser);
//Obtener comentarios de la publicacion
router.get('/publication/:publicationId', [
    (0, express_validator_1.check)('publicationId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('publicationId').custom(db_validators_1.publicationIdExist),
    validate_fields_1.validateFields
], comment_1.getCommentsPublication);
//Obtener comentario por id
router.get('/:commentId', [
    (0, express_validator_1.check)('commentId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('commentId').custom(db_validators_1.commentIdExist),
    validate_fields_1.validateFields
], comment_1.getComment);
//Crear comentarios
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('description', 'The description is required').not().isEmpty(),
    (0, express_validator_1.check)('publication_id', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('publication_id').custom(db_validators_1.publicationIdExist),
    validate_fields_1.validateFields
], comment_1.createComment);
//Actualizar comentarios
router.put('/:commentId', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('description', 'The description is required').not().isEmpty(),
    (0, express_validator_1.check)('commentId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('commentId').custom(db_validators_1.commentIdExist),
    validate_fields_1.validateFields
], comment_1.updateComment);
//Eliminar comentarios
router.delete('/:commentId', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('commentId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('commentId').custom(db_validators_1.commentIdExist),
    validate_fields_1.validateFields
], comment_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comment.js.map