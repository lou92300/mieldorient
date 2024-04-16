import pool from "../config/database.js";

const allArticles = async (req, res) => {
    try {
       
        const queryArticle = "SELECT * FROM product";

       
        const [result] = await pool.execute(queryArticle);
        
       
        res.status(200).json( result );
    } catch (error) {
        
        res.status(500).json({ msg: error.message });
    }
};

const allCategories = async (req, res) => {
    try {
        
        const queryCategories = "SELECT * FROM category";

        const [result] = await pool.execute(queryCategories);

        
        res.status(200).json(result);
    } catch (error) {
       
        res.status(500).json({ msg: error.message });
    }
};

const notFound = (req,res)=>{
    res.status(404).send("page not found");
}

export  {allArticles, allCategories ,notFound};