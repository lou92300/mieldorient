import { Router } from "express"
import { allArticles, notFound} from  "../controller/app.js"
import { allCategories } from "../controller/app.js";
import auth from '../middlewares/auth.js'

const router = Router();

//initial route : http://localhost:9005/api/v1/

router.get("/articles",allArticles);
router.get("/categories",allCategories)
// router.get("*",notFound)

export default router;

