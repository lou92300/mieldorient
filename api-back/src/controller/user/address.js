import pool from "../../config/database.js";

const addAddress = async (req, res) => {
  try {
      
      const userId = req.params.id;

     
      const { country, city, zipcode, number, street } = req.body;

      
      const [existingAddress] = await pool.execute("SELECT * FROM address WHERE user_id = ?", [userId]);

      if (existingAddress.length > 0) {
          
          const query = "UPDATE address SET country = ?, city = ?, zipcode = ?, number = ?, street = ? WHERE user_id = ?";
          const values = [country, city, zipcode, number, street, userId];
          await pool.execute(query, values);
          res.status(200).json({ message: 'Adresse de l\'utilisateur mise à jour avec succès' });
      } else {
        
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

      
      const [userAddresses] = await pool.execute("SELECT * FROM address WHERE user_id = ?", [userId]);

      res.status(200).json(userAddresses);
  } catch (error) {
      console.error('Erreur lors de la récupération des adresses de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export { addAddress, getUserAddresses };