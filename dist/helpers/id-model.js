"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idTypeAnimal = exports.idAnimal = exports.idRole = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const idRole = (role = "USER") => __awaiter(void 0, void 0, void 0, function* () {
    const roleId = yield models_1.Role.findOne({ where: { role } });
    return roleId === null || roleId === void 0 ? void 0 : roleId.id;
});
exports.idRole = idRole;
const idAnimal = (animal) => __awaiter(void 0, void 0, void 0, function* () {
    const animalId = yield models_1.Animal_type.findOne({ where: { animal } });
    return animalId === null || animalId === void 0 ? void 0 : animalId.id;
});
exports.idAnimal = idAnimal;
const idTypeAnimal = (animal) => __awaiter(void 0, void 0, void 0, function* () {
    const animalId = yield models_1.Animal_type.findOne({ where: {
            animal: {
                [sequelize_1.Op.substring]: animal
            }
        } });
    return animalId === null || animalId === void 0 ? void 0 : animalId.id;
});
exports.idTypeAnimal = idTypeAnimal;
//# sourceMappingURL=id-model.js.map