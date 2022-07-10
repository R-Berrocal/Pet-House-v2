import { Adoption, Animal_type,  Comment,  Publication, Role, User } from "../models"

export const emailExist = async(email:string)=>{
    const emailExist= await User.findOne({where:{email}})
    if(emailExist){
        throw new Error(`The email: ${email} is already in db`)
    }
}

export const isRoleValid=async(role:string)=>{
    const existRol= await Role.findOne({where:{role}});
    if(!existRol){
      throw new Error(`The rol ${role} not exist in db, role:["ADMIN","USER"]`);
    }
}
export const isAnimalValid=async(animal_type:string)=>{
    const existAnimal= await Animal_type.findOne({where:{animal: animal_type}});
    if(!existAnimal){
      throw new Error(`The animal ${animal_type} not exist in db, animal_type:["GATO","PERRO"]`);
    }
}

export const userIdExist= async(id:string)=>{

    //verificar si el usuario con id existe
    const idExist= await User.findByPk(id);
    if(!idExist){
      throw new Error(`User with id:${id}, not exist in db`)
    }
}

export const publicationIdExist= async(id:string)=>{

    //verificar si el usuario con id existe
    const idExist= await Publication.findByPk(id);
    if(!idExist){
      throw new Error(`Publication with id:${id}, not exist in db`)
    }
}

export const commentIdExist= async(id:string)=>{

    //verificar si el usuario con id existe
    const idExist= await Comment.findByPk(id);
    if(!idExist){
      throw new Error(`Comment with id:${id}, not exist in db`)
    }
}

export const adoptionIdExist= async(id:string)=>{

    //verificar si el usuario con id existe
    const idExist= await Adoption.findByPk(id);
    if(!idExist){
      throw new Error(`Adoption with id:${id}, not exist in db`)
    }
}
