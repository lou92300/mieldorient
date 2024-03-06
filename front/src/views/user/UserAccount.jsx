
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAddressForm from '../../components/user/Address';

const UserAccount = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [userData, setUserData] = useState({ ...userInfo });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showConfirmation) {
      setShowConfirmation(true);
      return; // Pas besoin de continuer tant que la confirmation n'est pas donnée
    }
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:9005/api/v1/utilisateur/updateUser/${userInfo.ID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Ajout de l'option pour inclure les cookies dans la demande
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setSuccessMessage('Modifications enregistrées avec succès.');
      } else {
        setErrorMessage(data.message); // Assuming server returns an error message
      }
      setIsLoading(false);
      setShowConfirmation(false); // Réinitialiser le statut de la confirmation
    } catch (error) {
      console.error('erreur lors du téléchargement des données', error);
      setErrorMessage('Impossible de sauvegarder les changements');
      setIsLoading(false);
      setShowConfirmation(false); // Réinitialiser le statut de la confirmation
    }
  };

  return (
    <div className='account-container'>
      <h2>Mon Compte</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Pseudo:
          <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </label>
        <label>
          Prénom:
          <input type="text" name="firstname" value={userData.firstname} onChange={handleInputChange} />
        </label>
        <label>
          Mot de passe:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Sauvegarde en cours...' : 'Sauvegarder'}</button>
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Voulez-vous vraiment sauvegarder les modifications ?</p>
            <button onClick={() => setShowConfirmation(false)}>Annuler</button>
            <button type="submit">Confirmer</button>
          </div>
        )}
      </form>
      <AddAddressForm userId={userInfo.ID} />
    </div>
  );
};

export default UserAccount;