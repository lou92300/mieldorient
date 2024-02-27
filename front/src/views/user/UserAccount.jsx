import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./style/styles.scss"


const UserAccount = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [userData, setUserData] = useState({ ...userInfo });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      console.error('Error updating user data:', error);
      setErrorMessage('An error occurred while saving changes.');
      setIsLoading(false);
    }
  };

  return (
    <div className='account-container'>
      <h2>Mon Compte</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </label>
        <label>
          First Name:
          <input type="text" name="firstname" value={userData.firstname} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
};

export default UserAccount;