import pool from "../../config/database.js";


const createCategory = async (req, res) => {
    try {
        // Récupérez le nom de la catégorie à partir du corps de la requête
        const { name } = req.body;
        // console.log(name)

        // Vérifiez si le nom de la catégorie existe déjà
        const [existingCategory] = await pool.execute("SELECT * FROM category WHERE name = ?", [name]);
        console.log(existingCategory)
        if (existingCategory.length > 0) {
            // console.log(existingCategory)
            return res.status(400).json({ msg: "La catégorie existe déjà" });
        }

        // Définissez la requête SQL pour insérer une nouvelle catégorie
        const queryAddCategory = "INSERT INTO category (name) VALUES (?)";

        // Utilisez le pool pour exécuter la requête avec les données fournies
        const result = await pool.execute(queryAddCategory, [name]);

        // Récupérez l'ID de la catégorie nouvellement insérée
        const categoryId = result.insertId;

        // Renvoyez une réponse indiquant que la catégorie a été ajoutée avec succès
        res.status(201).json({ msg: "Catégorie créée avec succès", categoryId });
    } catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ msg: error.message });
    }
};
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await pool.query("SELECT * FROM category WHERE id = ?", [id]);

        if (category.length === 0) {
            return res.status(404).json({ msg: "Catégorie non trouvée" });
        }

        res.status(200).json(category[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Vérifiez si la catégorie existe
        const existingCategory = await pool.query("SELECT * FROM category WHERE id = ?", [id]);
        if (existingCategory.length === 0) {
            return res.status(404).json({ msg: "Catégorie non trouvée" });
        }

        // Mettre à jour le nom de la catégorie
        await pool.query("UPDATE category SET name = ? WHERE id = ?", [name, id]);

        res.status(200).json({ msg: "Catégorie mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifiez si la catégorie existe
        const existingCategory = await pool.query("SELECT * FROM category WHERE id = ?", [id]);
        if (existingCategory.length === 0) {
            return res.status(404).json({ msg: "Catégorie non trouvée" });
        }

        // Supprimer la catégorie de la base de données
        await pool.query("DELETE FROM category WHERE id = ?", [id]);

        res.status(200).json({ msg: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export {createCategory, updateCategory,getCategoryById,deleteCategory}