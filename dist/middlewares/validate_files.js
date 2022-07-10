"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFiles = void 0;
const validateFiles = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'There are no files to upload' });
    }
    next();
};
exports.validateFiles = validateFiles;
//# sourceMappingURL=validate_files.js.map