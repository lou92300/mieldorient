import pool from "../../config/database.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    const [existingCategory] = await pool.execute(
      "SELECT * FROM category WHERE name = ?",
      [name]
    );
    if (existingCategory.length > 0) {
      return res.status(400).json({ msg: "La catégorie existe déjà" });
    }

    const queryAddCategory = "INSERT INTO category (name) VALUES (?)";

    const result = await pool.execute(queryAddCategory, [name]);

    res.status(201).json({ msg: "Catégorie créée avec succès", name });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await pool.query("SELECT * FROM category WHERE id = ?", [
      id,
    ]);

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

    const existingCategory = await pool.query(
      "SELECT * FROM category WHERE id = ?",
      [id]
    );
    if (existingCategory.length === 0) {
      return res.status(404).json({ msg: "Catégorie non trouvée" });
    }

    await pool.query("UPDATE category SET name = ? WHERE id = ?", [name, id]);

    res.status(200).json({ msg: "Catégorie mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await pool.query(
      "SELECT * FROM category WHERE id = ?",
      [id]
    );
    if (existingCategory.length === 0) {
      return res.status(404).json({ msg: "Catégorie non trouvée" });
    }

    await pool.query("DELETE FROM category WHERE id = ?", [id]);

    res.status(200).json({ msg: "Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export { createCategory, updateCategory, getCategoryById, deleteCategory };
