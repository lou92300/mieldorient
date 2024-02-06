import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import router from "./router/index.routes.js";



const {LOCAL_PORT} = process.env;


const app = express();
app.use(
    "/img",
    express.static(path.join(process.cwd(), "public/assets/images"))
);
app.use (express.json());

app.use("/api/v1",router)





app.listen(`${LOCAL_PORT}`,()=> console.log(`server is running on port http://localhost:${LOCAL_PORT}`));