import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccountButton = ({ userId }) => {
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        fetch(`http://localhost:9005/api/v1/utilisateur/updateUser/${userId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials : "include"
        })
        .then(response => {
            if (response.ok) {
                
                setMessage("Compte supprimé avec succès !");
                setTimeout(()=>{
                    navigate("/connexion")
                },2000)
            } else {
                
                setMessage("Erreur lors de la suppression du compte !");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du compte:', error);
            setMessage("Erreur lors de la suppression du compte !");
        });
    };

    return (
        <div>
            {message && <p>{message}</p>} {/* Afficher le message s'il est défini */}
            <button onClick={handleDeleteAccount} className="delete-btn">
                Supprimer mon compte
            </button>
        </div>
    );
};

export default DeleteAccountButton;