import User from './user';
import Role from './role';
import Publication from './publication';
import Animal_type from './animal_type';
import Localization from './localization';
import Imgs_publication from './imgs_publication';
import Comment from './comment';
import Adoption from './adoption';
import Imgs_adoption from './imgs_adoption'

//Un role puede estar en muchos usuarios, pero un usuario tiene un solo role
Role.hasMany(User,{
    foreignKey:'role_id'
});
User.belongsTo(Role,{
    foreignKey:'role_id'
});

//Una localizacion puede estar en muchas publicaciones, pero una publication puede tener una sola localization
Localization.hasMany(Publication,{
    foreignKey:'localization_id'
});
Publication.belongsTo(Localization,{
    foreignKey:'localization_id'
});

//Un tipo de animal puede estar en muchas publicaciones, pero una publicacion tiene un solo tipo de animal
Animal_type.hasMany(Publication,{
    foreignKey:'animal_id'
});
Publication.belongsTo(Animal_type,{
    foreignKey:'animal_id'
});

//Un usuario puede crear muchas pubicaciones, pero una publicacion pertenece a un solo usuario
User.hasMany(Publication,{
    foreignKey:'user_id'
});
Publication.belongsTo(User,{
    foreignKey:'user_id'
});

//Una publicacion puede tener muchas imagenes, pero una imagen pertence solo a una publicacion
Publication.hasMany(Imgs_publication,{
    foreignKey:'publication_id'
});
Imgs_publication.belongsTo(Publication,{
    foreignKey:'publication_id'
});

//Una publicacion puede tener muchos comentarios, pero un comentario pertenece a una sola publicacion
Publication.hasMany(Comment,{
    foreignKey:'publication_id'
});
Comment.belongsTo(Publication,{
    foreignKey:'publication_id'
});

//Un usuario puede crear muchos comentarios, pero un comentario es creado por un solo usuario
User.hasMany(Comment,{
    foreignKey:'user_id'
});
Comment.belongsTo(User,{
    foreignKey:'user_id'
});

//Un usuario puede solicitar muchas adopciones, pero una adopcion solo puede ser solicitada por un solo usuario 
User.hasMany(Adoption,{
    foreignKey:'user_id'
});
Adoption.belongsTo(User,{
    foreignKey:'user_id'
});

//Una publicacion solo puede tener una solicitud de adopcion, y una adopcion pertenece a una sola publicacion
Publication.hasOne(Adoption,{
    foreignKey:'publication_id'
});
Adoption.belongsTo(Publication,{
    foreignKey:'publication_id'
});

//Una adopcion puede tener muchas imagenes, pero una imagen pertenece a una sola adopcion
Adoption.hasMany(Imgs_adoption,{
    foreignKey:'adoption_id'
});
Imgs_adoption.belongsTo(Adoption,{
    foreignKey:'adoption_id'
});


export {
    User,
    Role,
    Publication,
    Animal_type,
    Localization,
    Imgs_publication,
    Comment,
    Adoption,
    Imgs_adoption
}