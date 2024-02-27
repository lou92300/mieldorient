import { Router } from "express";
import { login, register, logout, checkToken} from "../controller/auth.js";
import auth from "../middlewares/auth.js"

const router = Router()

//initial route : http://localhost:9005/api/v1/

router.post("/register",register)
router.post("/login",login)


router.get("/logout",logout)
router.get("/check-token", auth, checkToken)

export default router;