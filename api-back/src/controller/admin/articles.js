import pool from "../../config/database.js";
import { newProduct } from "../stripe/stripe.js";
import { updateProduct } from "../stripe/stripe.js";
import multer from "multer";
import fs from "fs";
import path from "path";


const upload = multer({
    dest: "/Users/lounesdjouani/Downloads/sites/projet-miel-dorient/api-back/public/assets/img",
  });
  
  const addArticle = async (req, res) => {
    try {
      // Utilisez Multer pour gérer le téléchargement de l'image
      upload.single("picture")(req, res, async function (err) {
        if (err) {
          return res.status(500).json({ msg: "Une erreur s'est produite lors du téléchargement de l'image." });
        }
        
        // Récupérez les données du corps de la requête, y compris les nouvelles propriétés
        const { name, description, price, stock, alt, tva, category_id } = req.body;
        console.log(req.body)
  
        // Vérifiez que toutes les données nécessaires sont présentes
        if (!name || !description || !price || !req.file || !stock || !alt || !tva || !category_id) {
          return res.status(400).json({ msg: "Veuillez fournir toutes les informations nécessaires pour ajouter un nouvel article." });
        }
  
        const picture = req.file.filename; // Nom de fichier de l'image téléchargée

  
        // Définissez la requête SQL pour insérer un nouvel article avec les nouvelles propriétés
        const queryAddArticle = "INSERT INTO product (name, description, price, picture, stock, alt, tva, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
        // Utilisez le pool pour exécuter la requête avec les données fournies
        const [result] = await pool.execute(queryAddArticle, [name, description, price, picture, stock, alt, tva, category_id]);
  
        // Appel de la fonction newProduct avec la requête (req) pour effectuer des opérations supplémentaires
        newProduct(req);
  
        // Renvoyez une réponse indiquant que l'article a été ajouté avec succès
        res.status(201).json({ msg: "Nouvel article ajouté avec succès!", articleId: result.insertId });
      });
    } catch (error) {
      // En cas d'erreur, renvoyez une réponse d'erreur
      res.status(500).json({ msg: error.message });
      // Affichez l'erreur dans la console pour un débogage supplémentaire
    }
  };

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    
    const queryArticle = "SELECT * FROM product WHERE id = ?";

   
    const [result] = await pool.execute(queryArticle, [id]);

  
    if (result.length === 0) {
      return res.status(404).json({ msg: "Article non trouvé" });
    }

   
    res.status(200).json(result[0]);
  } catch (error) {
   
    res.status(500).json({ msg: error.message });
  }
};

const modifyArticle = async (req, res) => {
  try {
    
    const articleId = req.params.id;

    if (!articleId) {
      return res
        .status(400)
        .json({ msg: "Veuillez fournir l'ID de l'article à modifier." });
    }

    // Récupérez les données de l'article à mettre à jour depuis le corps de la requête
    const { title, description, price, category_id } = req.body; 

    // Vérifiez que des données valides sont fournies pour la modification
    if (!title && !description && !price && !category_id ) { 
      return res
        .status(400)
        .json({ msg: "Veuillez fournir au moins une propriété à modifier." });
    }

    // Construisez dynamiquement la requête SQL en fonction des données fournies
    let queryModifyArticle = "UPDATE product SET";
    const updateFields = [];

    if (title) {
      queryModifyArticle += " title = ?,";
      updateFields.push(title);
    }
    if (description) {
      queryModifyArticle += " description = ?,";
      updateFields.push(description);
    }
    if (price) {
      queryModifyArticle += " price = ?,";
      updateFields.push(price);
    }
    if (category_id) { // Ajoutez category_id ici
      queryModifyArticle += " category_id = ?,"; // Ajoutez category_id ici
      updateFields.push(category_id); // Ajoutez category_id ici
    }

    queryModifyArticle = queryModifyArticle.slice(0, -1);

    queryModifyArticle += " WHERE id = ?";

    // Utilisez le pool pour exécuter la requête avec les paramètres sécurisés
    await pool.execute(queryModifyArticle, [...updateFields, articleId]);
    // updateProduct(req);
    // Renvoyez une réponse indiquant que l'article a été modifié avec succès
    res.status(200).json({ msg: `Article ${articleId} modifié avec succès!` });
  } catch (error) {
    // En cas d'erreur, renvoyez une réponse d'erreur
    res.status(500).json({ msg: error.message });
  }
};


const deleteArticle = async (req, res) => {


  try {
  
    const articleId = req.params.id;

   
    if (!articleId) {
      return res
        .status(400)
        .json({ msg: "Veuillez fournir l'ID de l'article à supprimer." });
    }

    const [article] = await pool.execute("SELECT picture FROM product WHERE id = ?", [articleId]);
    console.log(article , "article")

    if (article.length === 0) {
      return res.status(404).json({ msg: "Article non trouvé." });
    }

    
    const queryDeleteArticle = "DELETE FROM product WHERE id = ?";

    
    await pool.execute(queryDeleteArticle, [articleId]);

    const filePath = path.join("/Users/lounesdjouani/Downloads/sites/projet-miel-dorient/api-back/public/assets/img", article[0].picture);
    fs.unlinkSync(filePath);
    console.log(filePath, "filepath")
    

    
    res.status(200).json({ msg: "Article supprimé avec succès!" });
  } catch (error) {
   
    res.status(500).json({ msg: error.message });
  }
};

export { getArticleById, addArticle, modifyArticle, deleteArticle };
