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

const checkToken = (req, res) => {
    res.json({ user: req.user });
}

export {register, login, logout , checkToken}

