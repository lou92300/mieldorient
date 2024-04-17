import { Router } from "express";
import {getArticleById, addArticle , modifyArticle , deleteArticle} from "../controller/admin/articles.js";
import {getStats} from "../controller/admin/index.js"
import {createCategory, getCategoryById, updateCategory , deleteCategory} from "../controller/admin/categories.js"
import auth from "../middlewares/auth.js";


// initial http://localhost:9005/api/v1/admin

const router = Router()
// statistique //
router.get("/stats",getStats)
// router.get("/categories",allCategories)

// catégories //
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


//articles//
router.get("/articles/:id",getArticleById)
router.post("/articles",addArticle )
router.patch("/articles/:id",modifyArticle)
router.delete("/articles/:id",deleteArticle)

router.get("/check-token", auth,)

export default router;