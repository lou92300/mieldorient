import { Router } from "express"
import {addArticle, allArticles, deleteArticle, modifyArticle} from  "../controller/app.js"

const router = Router();

router.get("/articles/:ID", allArticles);
router.post("/articles/rajouter",addArticle)
router.put("/articles/modifier",modifyArticle)
router.delete("/articles/:id",deleteArticle)


export default router;

