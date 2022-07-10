import dotenv from 'dotenv';
import express,{ Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import {adoption, auth, comment, publication, user} from './routes';
import  {dbConnection}  from './db/db_connection';
// import { auth, character,  movie, genre } from './routes';
dotenv.config();

const app:Application = express();

//db connection
dbConnection();

// Middlewares

//cors
app.use(cors());
        
//body reading
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
    createParentPath:true
}))


//Routes
app.use("/api/user",user);
app.use("/api/auth",auth);
app.use("/api/publication",publication);
app.use("/api/comment",comment);
app.use("/api/adoption",adoption)

// app.use("/movies",movie);
// app.use("/genres",genre);


//listen

app.listen(process.env.PORT,()=>console.log("server running in the port",process.env.PORT))

export default app;