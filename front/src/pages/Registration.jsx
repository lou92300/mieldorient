import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:9005/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Inscription réussie!");
        setShowConfirmation(true);
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="container-connexion">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom d'utilisateur:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {showConfirmation && (
        <div className="confirmation-slide">Inscription réussie!</div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
