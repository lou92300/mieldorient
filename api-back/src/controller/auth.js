import bcrypt from "bcrypt";
import pool from "../config/database.js"


const register = async (req, res) => {
    try {
        const { username, firstname, address, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const [existingUsers] = await pool.execute("SELECT * FROM user WHERE username = ?", [username]);

        if (!existingUsers.length) {
            // Hacher le mot de passe
            const SALT = Number(process.env.B_SALT);
            const hashedPassword = await bcrypt.hash(password, SALT);

            // Insérer le nouvel utilisateur dans la base de données
            const [result] = await pool.execute("INSERT INTO user (username, firstname, address, email, password, role) VALUES (?, ?, ?, ?, ?, 'utilisateur')", [username, firstname, address, email, hashedPassword]);

            if (result.insertId) {
                res.status(201).json({ message: "Compte créé" });
                return;
            }
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
                res.status(200).json({ message: "Authentification réussie" });
                return;
            }
        }

        // Authentification échouée
        res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
    }
};



export {register, login}

