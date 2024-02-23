import { Router } from "express"
import { allArticles, notFound} from  "../controller/app.js"
import { allCategories } from "../controller/app.js";

const router = Router();

router.get("/articles", allArticles);
router.get("/categories",allCategories)
// router.post("/articles/rajouter",addArticle)
// router.put("/articles/modifier",modifyArticle)
// router.delete("/articles/:id",deleteArticle)
// router.get("*",notFound)

export default router;

