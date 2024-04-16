import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.routes.js";

const app = express();
const {LOCAL_PORT} = process.env;


app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use
    (cors({
    origin : "http://localhost:5173",
    methods :["GET", "POST", "DELETE","PATCH"],
    credentials : true,
    })
);

app.use(
    "/img",
    express.static(path.join(process.cwd(), "public/assets/img"))
);
app.use(express.json());


app.use("/api/v1",router)


app.get("/", (req, res) => {
    res.json({ msg: "api is running" });
});









app.listen(`${LOCAL_PORT}`,()=> console.log(`server is running on port http://localhost:${LOCAL_PORT}`));