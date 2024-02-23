import pool from "../config/database.js";

const allArticles = async (req, res) => {
    try {
        // Définissez la requête SQL pour récupérer tous les articles
        const queryArticle = "SELECT * FROM product";

        // Utilisez le pool pour exécuter la requête
        const [result] = await pool.execute(queryArticle);
        console.log(result)
        // Renvoyez les résultats en tant que réponse JSON
        res.status(200).json( result );
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
    }
};

const allCategories = async (req, res) => {
    try {
        // Définissez la requête SQL pour récupérer toutes les catégories
        const queryCategories = "SELECT * FROM category";

        // Utilisez le pool pour exécuter la requête
        const [result] = await pool.execute(queryCategories);

        // Renvoyez les résultats en tant que réponse JSON
        res.status(200).json(result);
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
    }
};

const notFound = (req,res)=>{
    res.status(404).send("page not found");
}

export  {allArticles, allCategories ,notFound};