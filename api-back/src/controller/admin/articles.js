import pool from "../../config/database.js";

const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        // Définissez la requête SQL pour récupérer un article par son ID
        const queryArticle = "SELECT * FROM product WHERE id = ?";

        // Utilisez le pool pour exécuter la requête avec l'ID fourni
        const [result] = await pool.execute(queryArticle, [id]);

        // Vérifiez si un article avec cet ID a été trouvé
        if (result.length === 0) {
            return res.status(404).json({ msg: "Article non trouvé" });
        }

        // Renvoyez l'article trouvé en tant que réponse JSON
        res.status(200).json(result[0]);
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
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

export {getArticleById,addArticle,modifyArticle,deleteArticle}