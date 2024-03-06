import pool from "../../config/database.js";

const addAddress = async (req, res) => {
  try {
      // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
      const userId = req.params.id;

      // Récupérer les données de l'adresse à partir du corps de la requête
      const { country, city, zipcode, number, street } = req.body;

      // Vérifier si une adresse existe déjà pour cet utilisateur
      const [existingAddress] = await pool.execute("SELECT * FROM address WHERE user_id = ?", [userId]);

      if (existingAddress.length > 0) {
          // Si une adresse existe, effectuez une mise à jour
          const query = "UPDATE address SET country = ?, city = ?, zipcode = ?, number = ?, street = ? WHERE user_id = ?";
          const values = [country, city, zipcode, number, street, userId];
          await pool.execute(query, values);
          res.status(200).json({ message: 'Adresse de l\'utilisateur mise à jour avec succès' });
      } else {
          // Si aucune adresse n'existe, insérez une nouvelle adresse
          const query = "INSERT INTO address (country, city, zipcode, number, street, user_id) VALUES (?, ?, ?, ?, ?, ?)";
          const values = [country, city, zipcode, number, street, userId];
          await pool.execute(query, values);
          res.status(201).json({ message: 'Nouvelle adresse de l\'utilisateur ajoutée avec succès' });
      }
  } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'adresse à l\'utilisateur', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}


const getUserAddresses = async (req, res) => {
  try {
      const userId = req.params.id;

      // Effectuer une requête à la base de données pour récupérer les adresses de l'utilisateur
      const [userAddresses] = await pool.execute("SELECT * FROM address WHERE user_id = ?", [userId]);

      res.status(200).json(userAddresses);
  } catch (error) {
      console.error('Erreur lors de la récupération des adresses de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export { addAddress, getUserAddresses };