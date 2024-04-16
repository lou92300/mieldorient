import pool from "../../config/database.js";


const createComment = async (req, res) => {
    try {
      const { text, rating, user_id, product_id } = req.body;
      const date = new Date().toISOString().slice(0, 19).replace('T', ' '); 
  
      const query = "INSERT INTO comment (text, rating, date, user_id, product_id) VALUES (?, ?, ?, ?, ?)";
      const values = [text, rating, date, user_id, product_id];
      await pool.execute(query, values);
  
      res.status(201).json({ message: 'Commentaire créé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la création du commentaire :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };


const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    const [comments] = await pool.execute("SELECT * FROM comment WHERE post_id = ?", [postId]);

    res.status(200).json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires du post :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const newText = req.body.text;

    const query = "UPDATE comment SET text = ? WHERE comment_id = ?";
    const values = [newText, commentId];
    await pool.execute(query, values);

    res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du commentaire :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const query = "DELETE FROM comment WHERE comment_id = ?";
    await pool.execute(query, [commentId]);

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export { createComment, getCommentsByPostId, updateComment, deleteComment };