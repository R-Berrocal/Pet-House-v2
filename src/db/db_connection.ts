import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';
dotenv.config()

const db= new Sequelize(process.env.DATABASE_NAME||"",process.env.DATABASE_USER||"",process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port:+process.env.DATABASE_PORT!,
  }
);
export const dbConnection=async()=>{
  try {
      await db.authenticate();
      // db.sync();
      console.log('Connection has been established succesfully')
  } catch (error:any) {
      throw new Error(error);
  }
}

export default db;