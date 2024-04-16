import pool from "../../config/database.js";
import bcrypt from "bcrypt";

const deleteUser = async (req, res) => {
    try {
       
        const userId = req.params.id;
      


        
        await pool.execute("DELETE FROM user WHERE ID = ?", [userId]);

        
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

const updateUser = async (req, res) => {
    try {
      const { username, email, firstname, password } = req.body;
      const userId = req.params.id;
  
      
      if (!password) {
       
        await pool.execute('UPDATE user SET username = ?, email = ?, firstname = ? WHERE id = ?', [username, email, firstname, userId]);
      } else {
        
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      
        await pool.execute('UPDATE user SET username = ?, email = ?, firstname = ?, password = ? WHERE id = ?', [username, email, firstname, hashedPassword, userId]);
      }
  
     
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'L\'adresse e-mail fournie n\'est pas valide' });
      }
  
      res.status(200).json({ message: 'Les données de l\'utilisateur ont été mises à jour avec succès', username: username, email: email, firstname: firstname, userId: userId });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour des données utilisateur' });
    }
  };
  
 
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  export {updateUser,deleteUser}