"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("./routes");
const db_connection_1 = require("./db/db_connection");
// import { auth, character,  movie, genre } from './routes';
dotenv_1.default.config();
const app = (0, express_1.default)();
//db connection
(0, db_connection_1.dbConnection)();
// Middlewares
//cors
app.use((0, cors_1.default)());
//body reading
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));
//Routes
app.use("/api/user", routes_1.user);
app.use("/api/auth", routes_1.auth);
app.use("/api/publication", routes_1.publication);
app.use("/api/comment", routes_1.comment);
app.use("/api/adoption", routes_1.adoption);
// app.use("/movies",movie);
// app.use("/genres",genre);
//listen
app.listen(process.env.PORT, () => console.log("server running in the port", process.env.PORT));
exports.default = app;
//# sourceMappingURL=app.js.map