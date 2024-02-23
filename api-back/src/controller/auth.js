import bcrypt from "bcrypt";
import pool from "../config/database.js"
import  jwt  from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérification de la longueur du nom d'utilisateur et du mot de passe
        if (username.length < 4) {
            return res.status(400).json({ message: "Le nom d'utilisateur doit contenir au moins 4 caractères." });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères." });
        }

        // Vérifier si l'utilisateur existe déjà
        const [existingUsers] = await pool.execute("SELECT * FROM user WHERE username = ?", [username]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Ce nom d'utilisateur existe déjà. Veuillez en choisir un autre." });
        }

        // Hacher le mot de passe
        const SALT = Number(process.env.B_SALT);
        const hashedPassword = await bcrypt.hash(password, SALT);

        // Insérer le nouvel utilisateur dans la base de données
        const [result] = await pool.execute("INSERT INTO user (username, password, role) VALUES (?, ?, 'utilisateur')", [username, hashedPassword]);

        if (result.insertId) {
            res.status(201).json({ message: "Compte créé" });
            return;
        }

        res.status(409).json({ message: "Compte non créé, veuillez réessayer" });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation des entrées (utilisez express-validator par exemple)

        // Vérifier si l'utilisateur existe
        const [existingUsers] = await pool.execute("SELECT * FROM user WHERE username = ?", [username]);

        if (existingUsers.length > 0) {
            // Comparer les mots de passe hachés
            const hashedPassword = existingUsers[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);

            if (passwordMatch) {
                // Authentification réussie
                // Créer un token avec le nom d'utilisateur et le rôle
                const { username, role } = existingUsers[0];
                const token = jwt.sign({ username, role }, process.env.SECRET_TOKEN, { 
                    algorithm: "HS256",
                    allowInsecureKeySizes: true,
                    expiresIn: '1h' });
                console.log(token, 'test')
                // Envoyer le token avec la réponse
                res.cookie("TK_AUTH", token, {
                    sameSite: "lax",
                    httpOnly: true,
                    maxAge: 3600000 }); // 1 heure
                return res.json({ message: "Authentification réussie" , role: role , username : username});
            }
        }

        // Authentification échouée
        res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
    }
};

const logout = async (req, res) => {
    try {
        // Supprimer le cookie de l'utilisateur en définissant une date d'expiration dans le passé
        res.clearCookie('TK_AUTH');
        res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
    }
};

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

const checkToken = (req, res) => {
    res.json({ user: req.user });
}

export {register, login, logout , checkToken, updateUser}

