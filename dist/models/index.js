"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imgs_adoption = exports.Adoption = exports.Comment = exports.Imgs_publication = exports.Localization = exports.Animal_type = exports.Publication = exports.Role = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const role_1 = __importDefault(require("./role"));
exports.Role = role_1.default;
const publication_1 = __importDefault(require("./publication"));
exports.Publication = publication_1.default;
const animal_type_1 = __importDefault(require("./animal_type"));
exports.Animal_type = animal_type_1.default;
const localization_1 = __importDefault(require("./localization"));
exports.Localization = localization_1.default;
const imgs_publication_1 = __importDefault(require("./imgs_publication"));
exports.Imgs_publication = imgs_publication_1.default;
const comment_1 = __importDefault(require("./comment"));
exports.Comment = comment_1.default;
const adoption_1 = __importDefault(require("./adoption"));
exports.Adoption = adoption_1.default;
const imgs_adoption_1 = __importDefault(require("./imgs_adoption"));
exports.Imgs_adoption = imgs_adoption_1.default;
//Un role puede estar en muchos usuarios, pero un usuario tiene un solo role
role_1.default.hasMany(user_1.default, {
    foreignKey: 'role_id'
});
user_1.default.belongsTo(role_1.default, {
    foreignKey: 'role_id'
});
//Una localizacion puede estar en muchas publicaciones, pero una publication puede tener una sola localization
localization_1.default.hasMany(publication_1.default, {
    foreignKey: 'localization_id'
});
publication_1.default.belongsTo(localization_1.default, {
    foreignKey: 'localization_id'
});
//Un tipo de animal puede estar en muchas publicaciones, pero una publicacion tiene un solo tipo de animal
animal_type_1.default.hasMany(publication_1.default, {
    foreignKey: 'animal_id'
});
publication_1.default.belongsTo(animal_type_1.default, {
    foreignKey: 'animal_id'
});
//Un usuario puede crear muchas pubicaciones, pero una publicacion pertenece a un solo usuario
user_1.default.hasMany(publication_1.default, {
    foreignKey: 'user_id'
});
publication_1.default.belongsTo(user_1.default, {
    foreignKey: 'user_id'
});
//Una publicacion puede tener muchas imagenes, pero una imagen pertence solo a una publicacion
publication_1.default.hasMany(imgs_publication_1.default, {
    foreignKey: 'publication_id'
});
imgs_publication_1.default.belongsTo(publication_1.default, {
    foreignKey: 'publication_id'
});
//Una publicacion puede tener muchos comentarios, pero un comentario pertenece a una sola publicacion
publication_1.default.hasMany(comment_1.default, {
    foreignKey: 'publication_id'
});
comment_1.default.belongsTo(publication_1.default, {
    foreignKey: 'publication_id'
});
//Un usuario puede crear muchos comentarios, pero un comentario es creado por un solo usuario
user_1.default.hasMany(comment_1.default, {
    foreignKey: 'user_id'
});
comment_1.default.belongsTo(user_1.default, {
    foreignKey: 'user_id'
});
//Un usuario puede solicitar muchas adopciones, pero una adopcion solo puede ser solicitada por un solo usuario 
user_1.default.hasMany(adoption_1.default, {
    foreignKey: 'user_id'
});
adoption_1.default.belongsTo(user_1.default, {
    foreignKey: 'user_id'
});
//Una publicacion solo puede tener una solicitud de adopcion, y una adopcion pertenece a una sola publicacion
publication_1.default.hasOne(adoption_1.default, {
    foreignKey: 'publication_id'
});
adoption_1.default.belongsTo(publication_1.default, {
    foreignKey: 'publication_id'
});
//Una adopcion puede tener muchas imagenes, pero una imagen pertenece a una sola adopcion
adoption_1.default.hasMany(imgs_adoption_1.default, {
    foreignKey: 'adoption_id'
});
imgs_adoption_1.default.belongsTo(adoption_1.default, {
    foreignKey: 'adoption_id'
});
//# sourceMappingURL=index.js.map