import { Op } from "sequelize";
import { Role,Animal_type } from "../models"

export const idRole=async(role:string="USER")=>{
    const roleId= await Role.findOne({where:{role}});
    return roleId?.id;
}

export const idAnimal=async(animal:string)=>{
    const animalId= await Animal_type.findOne({where:{animal}});
    return animalId?.id;
}

export const idTypeAnimal=async(animal:string)=>{
    const animalId= await Animal_type.findOne({where:{
        animal:{
            [Op.substring]:animal
        }
    }});
    return animalId?.id;
}