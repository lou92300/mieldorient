import pool from "../../config/database.js";

const getStats = async (req, res) => {
    try {
        // Requête pour obtenir le total des utilisateurs
        const queryTotalUsers = `
            SELECT COUNT(*) AS total_users 
            FROM user;
        `;
        const [totalUsersResult] = await pool.query(queryTotalUsers);
        const totalUsers = totalUsersResult[0].total_users;

        // Requête pour obtenir les utilisateurs avec leur nom d'utilisateur et leur prénom
        const queryUser = `
            SELECT username, 
                   firstname 
            FROM user;
        `;
        const [userData] = await pool.query(queryUser);

        // Requête pour obtenir les catégories de produits
        const queryCategory = `
            SELECT * FROM category;
        `;
        const [categoryData] = await pool.query(queryCategory);

        // Requête pour obtenir les produits avec leur nom, leur prix, leur stock et leur catégorie
        const queryProduct = `
            SELECT name, price, stock, category_id
            FROM product;
        `;
        const [productData] = await pool.query(queryProduct);

        res.json({ 
            totalUsers,
            users: userData, 
            categories: categoryData,
            products: productData 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des statistiques." });
    }
};

export {getStats}