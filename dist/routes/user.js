"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const db_validators_1 = require("../helpers/db-validators");
const validate_jwt_1 = require("../middlewares/validate_jwt");
const validate_role_1 = require("../middlewares/validate_role");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validateJWT,
    validate_role_1.isAdminRole
], user_1.getUsers);
router.get('/:userId', [
    validate_jwt_1.validateJWT,
], user_1.getUser);
router.post('/', [
    (0, express_validator_1.check)('name1', 'name1 is required').not().isEmpty(),
    (0, express_validator_1.check)('last_name1', 'last_name1 is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExist),
    (0, express_validator_1.check)('password', 'The password must hace more than six characters').isLength({ min: 6 }),
    (0, express_validator_1.check)('role').custom(db_validators_1.isRoleValid).optional(),
    validate_fields_1.validateFields
], user_1.createUser);
router.put('/:userId', [
    validate_jwt_1.validateJWT,
    (0, validate_role_1.haveRole)("ADMIN", "USER"),
    (0, express_validator_1.check)('userId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('userId').custom(db_validators_1.userIdExist),
    (0, express_validator_1.check)('role').custom(db_validators_1.isRoleValid).optional(),
    validate_fields_1.validateFields
], user_1.updateUser);
router.delete('/:userId', [
    validate_jwt_1.validateJWT,
    validate_role_1.isAdminRole,
    (0, express_validator_1.check)('userId', 'Is not uuid').isUUID(),
    (0, express_validator_1.check)('userId').custom(db_validators_1.userIdExist),
    validate_fields_1.validateFields
], user_1.deletUser);
exports.default = router;
//# sourceMappingURL=user.js.map