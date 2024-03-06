import pool from "../../config/database.js";

const deleteUser = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à supprimer à partir des paramètres de la requête
        const userId = req.params.id;
        console.log(userId)


        // Exécuter la requête SQL pour supprimer l'utilisateur de la base de données
        await pool.execute("DELETE FROM user WHERE ID = ?", [userId]);

        // Répondre avec un message de succès
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

const updateUser = async (req, res) => {
    try {
      const { username, email, firstname, password } = req.body;
      const userId = req.params.id; // Récupérez l'ID de l'utilisateur à mettre à jour depuis les paramètres de la requête
  
      // Vérifier si le mot de passe est fourni
      if (!password) {
        // Si le mot de passe n'est pas fourni, mettez à jour uniquement les autres champs
        await pool.execute('UPDATE user SET username = ?, email = ?, firstname = ? WHERE id = ?', [username, email, firstname, userId]);
      } else {
        // Si le mot de passe est fourni, hacher le nouveau mot de passe avec bcrypt
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
        // Mettre à jour le nom d'utilisateur, l'email, le prénom et le mot de passe dans la base de données
        await pool.execute('UPDATE user SET username = ?, email = ?, firstname = ?, password = ? WHERE id = ?', [username, email, firstname, hashedPassword, userId]);
      }
  
      // Vérifier si l'email fourni est valide
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'L\'adresse e-mail fournie n\'est pas valide' });
      }
  
      res.status(200).json({ message: 'Les données de l\'utilisateur ont été mises à jour avec succès', username: username, email: email, firstname: firstname, userId: userId });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour des données utilisateur' });
    }
  };
  
  // Fonction pour vérifier si l'email est valide en utilisant une expression régulière
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  export {updateUser,deleteUser}