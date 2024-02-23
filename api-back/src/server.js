import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.routes.js";



const {LOCAL_PORT} = process.env;

const app = express();
app.use(cookieParser())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : "http://localhost:5173",
    methods :["GET", "POST", "DELETE", "PUT","PATCH"],
    credentials : true,
}))
app.use(
    "/img",
    express.static(path.join(process.cwd(), "public/assets/img"))
);


app.use("/api/v1",router)





app.listen(`${LOCAL_PORT}`,()=> console.log(`server is running on port http://localhost:${LOCAL_PORT}`));