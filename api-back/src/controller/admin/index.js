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


const addArticle = async (req, res) => {
    try {
        // Récupérez les données du corps de la requête, y compris les nouvelles propriétés
        const { name, description, price, picture, stock, alt, tva, category_id } = req.body;

        // Vérifiez que toutes les données nécessaires sont présentes
        if (!name || !description || !price || !picture || !stock || !alt || !tva || !category_id) {
            return res.status(400).json({ msg: "Veuillez fournir toutes les informations nécessaires pour ajouter un nouvel article." });
        }

        // Définissez la requête SQL pour insérer un nouvel article avec les nouvelles propriétés
        const queryAddArticle = "INSERT INTO product (name, description, price, picture, stock, alt, tva, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        // Utilisez le pool pour exécuter la requête avec les données fournies
        const [result] = await pool.execute(queryAddArticle, [name, description, price, picture, stock, alt, tva, category_id]);

        // Renvoyez une réponse indiquant que l'article a été ajouté avec succès
        res.status(201).json({ msg: "Nouvel article ajouté avec succès!", articleId: result.insertId });
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
    }
};

const modifyArticle = async (req, res) => {
    try {
        // Récupérez l'ID de l'article à modifier depuis les paramètres de la requête
        const articleId = req.params.id;

        // Vérifiez que l'ID de l'article est fourni
        if (!articleId) {
            return res.status(400).json({ msg: "Veuillez fournir l'ID de l'article à modifier." });
        }

        // Récupérez les données de l'article à mettre à jour depuis le corps de la requête
        const { title, description, price } = req.body;

        // Vérifiez que des données valides sont fournies pour la modification
        if (!title && !description && !price) {
            return res.status(400).json({ msg: "Veuillez fournir au moins une propriété à modifier." });
        }

        // Construisez dynamiquement la requête SQL en fonction des données fournies
        let queryModifyArticle = "UPDATE product SET";
        const updateFields = [];

        if (title) updateFields.push(` title = '${title}'`);
        if (description) updateFields.push(` description = '${description}'`);
        if (price) updateFields.push(` price = '${price}'`);

        queryModifyArticle += updateFields.join(', ');
        queryModifyArticle += ` WHERE id = ${articleId}`;

        // Utilisez le pool pour exécuter la requête
        await pool.execute(queryModifyArticle);

        // Renvoyez une réponse indiquant que l'article a été modifié avec succès
        res.status(200).json({ msg: `Article ${articleId} modifié avec succès!` });
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        // Récupérez l'ID de l'article à supprimer depuis les paramètres de la requête
        const articleId = req.params.id;

        // Vérifiez que l'ID de l'article est fourni
        if (!articleId) {
            return res.status(400).json({ msg: "Veuillez fournir l'ID de l'article à supprimer." });
        }

        // Définissez la requête SQL pour supprimer l'article
        const queryDeleteArticle = "DELETE FROM product WHERE id = ?";

        // Utilisez le pool pour exécuter la requête avec l'ID fourni
        await pool.execute(queryDeleteArticle, [articleId]);

        // Renvoyez une réponse indiquant que l'article a été supprimé avec succès
        res.status(200).json({ msg: "Article supprimé avec succès!" });
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
    }
};

export {getStats}