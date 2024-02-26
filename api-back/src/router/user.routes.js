import auth from "../middlewares/auth.js"
import { updateUser } from "../controller/auth.js";
import { Router } from "express";

// initial route http://localhost:9005/api/v1/utilisateur/

const router = Router()

router.patch("/updateUser/:id",updateUser)


export default router