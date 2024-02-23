import {Router} from "express";
import adminAuth from "../middlewares/adminAuth.js"
import auth from "../middlewares/auth.js"
import postRouter from "./auth.routes.js"
import getRouter from "./app.routes.js"
import adminRouter from "./admin.routes.js"


const router = Router();

router.use(postRouter)
router.use(getRouter)


router.use("/admin",adminAuth,adminRouter)
router.use("/utilisateur",auth)


export default router;