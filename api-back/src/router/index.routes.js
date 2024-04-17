import {Router} from "express";
import adminAuth from "../middlewares/adminAuth.js"
import auth from "../middlewares/auth.js"
import postRouter from "./auth.routes.js"
import getRouter from "./app.routes.js"
import adminRouter from "./admin.routes.js"
import userRouter from "./user.routes.js"

//http://localhost:9005/api/v1/admin/
const router = Router();

router.use(postRouter)
router.use(getRouter)


router.use("/admin",adminAuth, adminRouter)
router.use("/utilisateur",auth, userRouter )


export default router;