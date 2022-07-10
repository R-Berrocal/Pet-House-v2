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
exports.adoptionIdExist = exports.commentIdExist = exports.publicationIdExist = exports.userIdExist = exports.isAnimalValid = exports.isRoleValid = exports.emailExist = void 0;
const models_1 = require("../models");
const emailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield models_1.User.findOne({ where: { email } });
    if (emailExist) {
        throw new Error(`The email: ${email} is already in db`);
    }
});
exports.emailExist = emailExist;
const isRoleValid = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const existRol = yield models_1.Role.findOne({ where: { role } });
    if (!existRol) {
        throw new Error(`The rol ${role} not exist in db, role:["ADMIN","USER"]`);
    }
});
exports.isRoleValid = isRoleValid;
const isAnimalValid = (animal_type) => __awaiter(void 0, void 0, void 0, function* () {
    const existAnimal = yield models_1.Animal_type.findOne({ where: { animal: animal_type } });
    if (!existAnimal) {
        throw new Error(`The animal ${animal_type} not exist in db, animal_type:["GATO","PERRO"]`);
    }
});
exports.isAnimalValid = isAnimalValid;
const userIdExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //verificar si el usuario con id existe
    const idExist = yield models_1.User.findByPk(id);
    if (!idExist) {
        throw new Error(`User with id:${id}, not exist in db`);
    }
});
exports.userIdExist = userIdExist;
const publicationIdExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //verificar si el usuario con id existe
    const idExist = yield models_1.Publication.findByPk(id);
    if (!idExist) {
        throw new Error(`Publication with id:${id}, not exist in db`);
    }
});
exports.publicationIdExist = publicationIdExist;
const commentIdExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //verificar si el usuario con id existe
    const idExist = yield models_1.Comment.findByPk(id);
    if (!idExist) {
        throw new Error(`Comment with id:${id}, not exist in db`);
    }
});
exports.commentIdExist = commentIdExist;
const adoptionIdExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //verificar si el usuario con id existe
    const idExist = yield models_1.Adoption.findByPk(id);
    if (!idExist) {
        throw new Error(`Adoption with id:${id}, not exist in db`);
    }
});
exports.adoptionIdExist = adoptionIdExist;
//# sourceMappingURL=db-validators.js.map