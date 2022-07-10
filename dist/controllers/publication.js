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
exports.cancelAdoption = exports.confirmAdoption = exports.deletPublication = exports.updatePublication = exports.getPublication = exports.getPublicationsUser = exports.getPublicationsType = exports.getPublications = exports.createPublication = void 0;
const uuid_1 = require("uuid");
const id_model_1 = require("../helpers/id-model");
const models_1 = require("../models");
const cloudinary_1 = require("cloudinary");
const cloudinary = cloudinary_1.v2;
cloudinary.config(process.env.CLOUDINARY_URL || "");
const createPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { condition, animal_type, lng, lat } = _b, resto = __rest(_b, ["condition", "animal_type", "lng", "lat"]);
    const array = (_a = req.files) === null || _a === void 0 ? void 0 : _a.imgs;
    try {
        const animalType = yield (0, id_model_1.idAnimal)(animal_type);
        const localization = yield models_1.Localization.create({
            id: (0, uuid_1.v4)(),
            lng,
            lat
        });
        const publication = models_1.Publication.build(Object.assign({ id: (0, uuid_1.v4)(), localization_id: localization.id, animal_id: animalType, user_id: req.user.id }, resto));
        if (Array.isArray(array)) {
            yield publication.save();
            const tempPath = array.map(({ tempFilePath }) => tempFilePath);
            tempPath.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                let { secure_url } = yield cloudinary.uploader.upload(element, {
                    folder: 'Publications'
                });
                yield models_1.Imgs_publication.create({
                    id: (0, uuid_1.v4)(),
                    publication_id: publication.id,
                    url: secure_url
                });
            }));
        }
        else {
            yield publication.save();
            const { tempFilePath } = array;
            const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, {
                folder: 'Publications'
            });
            yield models_1.Imgs_publication.create({
                id: (0, uuid_1.v4)(),
                publication_id: publication.id,
                url: secure_url
            });
        }
        res.status(201).json({
            publication
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hable con el administrador"
        });
    }
});
exports.createPublication = createPublication;
const getPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const publications = yield models_1.Publication.findAll({
            where: {
                condition: true
            },
            include: [
                {
                    attributes: ['lng', 'lat'],
                    model: models_1.Localization
                },
                {
                    attributes: ['animal'],
                    model: models_1.Animal_type
                },
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                },
                {
                    attributes: ['url'],
                    model: models_1.Imgs_publication
                }
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: publications.length,
            publications
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getPublications = getPublications;
const getPublicationsType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    const { type } = req.params;
    try {
        const publications = yield models_1.Publication.findAll({
            where: {
                condition: true,
                animal_id: yield (0, id_model_1.idTypeAnimal)(type)
            },
            include: [
                {
                    attributes: ['lng', 'lat'],
                    model: models_1.Localization
                },
                {
                    attributes: ['animal'],
                    model: models_1.Animal_type
                },
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                },
                {
                    attributes: ['url'],
                    model: models_1.Imgs_publication
                }
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: publications.length,
            publications
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getPublicationsType = getPublicationsType;
const getPublicationsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    const { userId } = req.params;
    try {
        const publications = yield models_1.Publication.findAll({
            where: {
                condition: true,
                user_id: userId
            },
            include: [
                {
                    attributes: ['lng', 'lat'],
                    model: models_1.Localization
                },
                {
                    attributes: ['animal'],
                    model: models_1.Animal_type
                },
                {
                    attributes: ['url'],
                    model: models_1.Imgs_publication
                }
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: publications.length,
            publications
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getPublicationsUser = getPublicationsUser;
const getPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicationId } = req.params;
    const publication = yield models_1.Publication.findOne({
        where: { id: publicationId },
        include: [
            {
                attributes: ['lng', 'lat'],
                model: models_1.Localization
            },
            {
                attributes: ['animal'],
                model: models_1.Animal_type
            },
            {
                attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                model: models_1.User
            },
            {
                attributes: ['url'],
                model: models_1.Imgs_publication
            }
        ],
    });
    res.json({
        publication
    });
});
exports.getPublication = getPublication;
const updatePublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicationId } = req.params;
    const _c = req.body, { id, condition, animal_type, lng, lat } = _c, resto = __rest(_c, ["id", "condition", "animal_type", "lng", "lat"]);
    try {
        if (animal_type) {
            resto.animal_id = yield (0, id_model_1.idAnimal)(animal_type);
            ;
        }
        const publication = yield models_1.Publication.findByPk(publicationId);
        if (lng || lat) {
            const localization = yield models_1.Localization.findByPk(publication.localization_id);
            localization.update({
                lng,
                lat
            });
        }
        yield publication.update(resto);
        res.json({
            publication
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.updatePublication = updatePublication;
const deletPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { publicationId } = req.params;
        const publication = yield models_1.Publication.findByPk(publicationId);
        publication.update({ condition: false });
        res.json({
            publication
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.deletPublication = deletPublication;
const confirmAdoption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicationId } = req.params;
    const publicationAdopt = yield models_1.Publication.findByPk(publicationId);
    publicationAdopt.update({ isAdopt: true, condition: false });
    res.json({
        publicationAdopt,
    });
});
exports.confirmAdoption = confirmAdoption;
const cancelAdoption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicationId } = req.params;
    const publicationAdopt = yield models_1.Publication.findByPk(publicationId);
    publicationAdopt.update({ isAdopt: false, condition: true });
    res.json({
        publicationAdopt,
    });
});
exports.cancelAdoption = cancelAdoption;
//# sourceMappingURL=publication.js.map