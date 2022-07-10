"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validate_fields_1 = require("../middlewares/validate_fields");
const validate_jwt_1 = require("../middlewares/validate_jwt");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], auth_1.renovateJWT);
router.post('/login', [
    (0, express_validator_1.check)('email', 'email is not valid').isEmail(),
    (0, express_validator_1.check)('password', 'password is required').not().isEmpty(),
    validate_fields_1.validateFields
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map