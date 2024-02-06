import {Router} from "express";
import postRouter from "./auth.routes.js"
import getRouter from "./app.routes.js"


const router = Router();

router.use(postRouter)
router.use(getRouter)

export default router;