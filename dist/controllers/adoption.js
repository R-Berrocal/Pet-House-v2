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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletAdoptionRejected = exports.deletAdoption = exports.getConfirmAdoptions = exports.getAdoptions = exports.createAdoption = void 0;
const uuid_1 = require("uuid");
const models_1 = require("../models");
const cloudinary_1 = require("cloudinary");
const cloudinary = cloudinary_1.v2;
cloudinary.config(process.env.CLOUDINARY_URL || "");
const createAdoption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { condition, user_id } = _b, resto = __rest(_b, ["condition", "user_id"]);
    const array = (_a = req.files) === null || _a === void 0 ? void 0 : _a.imgs;
    try {
        const adoption = models_1.Adoption.build(Object.assign({ id: (0, uuid_1.v4)(), user_id: req.user.id }, resto));
        yield models_1.Publication.update({ isAdopt: false }, { where: { id: adoption.publication_id } });
        if (Array.isArray(array)) {
            yield adoption.save();
            const tempPath = array.map(({ tempFilePath }) => tempFilePath);
            tempPath.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                let { secure_url } = yield cloudinary.uploader.upload(element, {
                    folder: 'Adoptions'
                });
                yield models_1.Imgs_adoption.create({
                    id: (0, uuid_1.v4)(),
                    adoption_id: adoption.id,
                    url: secure_url
                });
            }));
        }
        else {
            yield adoption.save();
            const { tempFilePath } = array;
            const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, {
                folder: 'Adoptions'
            });
            yield models_1.Imgs_adoption.create({
                id: (0, uuid_1.v4)(),
                adoption_id: adoption.id,
                url: secure_url
            });
        }
        res.status(201).json({
            adoption
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hable con el administrador"
        });
    }
});
exports.createAdoption = createAdoption;
const getAdoptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const adoptions = yield models_1.Adoption.findAll({
            where: {
                condition: true
            },
            include: [
                {
                    attributes: ['title', 'description'],
                    model: models_1.Publication,
                    include: [{ attributes: ['url'], model: models_1.Imgs_publication }]
                },
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                }
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: adoptions.length,
            adoptions
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getAdoptions = getAdoptions;
const getConfirmAdoptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const adoptions = yield models_1.Adoption.findAll({
            where: {
                condition: false
            },
            include: [
                {
                    attributes: ['title', 'description'],
                    model: models_1.Publication,
                    include: [{ attributes: ['url'], model: models_1.Imgs_publication }]
                },
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                }
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: adoptions.length,
            adoptions
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getConfirmAdoptions = getConfirmAdoptions;
const deletAdoption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adoptionId } = req.params;
        const adoption = yield models_1.Adoption.findByPk(adoptionId);
        adoption.update({ condition: false });
        res.json({
            adoption
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.deletAdoption = deletAdoption;
const deletAdoptionRejected = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adoptionId } = req.params;
        const adoption = yield models_1.Adoption.destroy({ where: { id: adoptionId } });
        res.json({
            adoption
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.deletAdoptionRejected = deletAdoptionRejected;
//# sourceMappingURL=adoption.js.map