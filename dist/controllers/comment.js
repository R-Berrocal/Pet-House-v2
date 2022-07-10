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
exports.deleteComment = exports.updateComment = exports.getComment = exports.getCommentsPublication = exports.getCommentsUser = exports.getComments = exports.createComment = void 0;
const uuid_1 = require("uuid");
const models_1 = require("../models");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { publication_id } = _a, resto = __rest(_a, ["publication_id"]);
    try {
        const comment = models_1.Comment.build(Object.assign({ id: (0, uuid_1.v4)(), publication_id, user_id: req.user.id }, resto));
        yield comment.save();
        res.status(201).json({
            comment
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hable con el administrador"
        });
    }
});
exports.createComment = createComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const comments = yield models_1.Comment.findAll({
            where: {
                condition: true
            },
            include: [
                {
                    attributes: ['id', 'title'],
                    model: models_1.Publication
                },
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                },
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: comments.length,
            comments
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getComments = getComments;
const getCommentsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    const { userId } = req.params;
    try {
        const comments = yield models_1.Comment.findAll({
            where: {
                condition: true,
                user_id: userId
            },
            include: [
                {
                    attributes: ['id', 'title'],
                    model: models_1.Publication
                },
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: comments.length,
            comments
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getCommentsUser = getCommentsUser;
const getCommentsPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    const { publicationId } = req.params;
    try {
        const comments = yield models_1.Comment.findAll({
            where: {
                condition: true,
                publication_id: publicationId
            },
            include: [
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                },
            ],
            order: [['createdAt', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: comments.length,
            comments
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getCommentsPublication = getCommentsPublication;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    try {
        const comment = yield models_1.Comment.findOne({
            where: { id: commentId },
            include: [
                {
                    attributes: ['id', 'title'],
                    model: models_1.Publication
                },
                {
                    attributes: ['name1', 'name2', 'last_name1', 'last_name2', 'img'],
                    model: models_1.User
                }
            ]
        });
        res.json({
            comment
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getComment = getComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const _b = req.body, { id, publication_id, user_id } = _b, resto = __rest(_b, ["id", "publication_id", "user_id"]);
    try {
        const comment = yield models_1.Comment.findByPk(commentId);
        yield comment.update(resto);
        res.json({
            comment
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    try {
        const comment = yield models_1.Comment.findByPk(commentId);
        yield comment.update({ condition: false });
        res.json({
            comment
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=comment.js.map