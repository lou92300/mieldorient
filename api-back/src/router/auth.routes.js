import { Router } from "express";
import { login, register, logout, checkToken, updateUser } from "../controller/auth.js";
import auth from "../middlewares/auth.js"

const router = Router()

//initial route : /api/v1/

router.post("/register",register)
router.post("/login",login)
// router.patch("/updateUser/:id",auth,updateUser)

router.get("/logout",logout)
router.get("/check-token", auth, checkToken)

export default router;