// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// const UserAccount = () => {
//   // Sélectionnez les informations de l'utilisateur à partir de l'état global
//   const userInfo = useSelector((state) => state.user.userInfo);
//   const { username, email, address, phoneNumber } = userInfo;

//   // État pour le mode édition du profil
//   const [editMode, setEditMode] = useState(false);
//   const [updatedUserData, setUpdatedUserData] = useState({ ...userInfo });

//   // Fonction de mise à jour des données utilisateur
//   const handleUpdateProfile = () => {
//     // Logique pour mettre à jour les données utilisateur (à implémenter)
//     // setUpdatedUserData(updatedData);
//     // Mettre à jour les informations de l'utilisateur via l'action et le reducer appropriés
//     // dispatch(updateUserData(updatedData));
//     setEditMode(false); // Sortir du mode édition après la mise à jour
//   };

//   return (
//     <div>
//       <h2>Mon compte</h2>
//       <div>
//         {/* Affichez les informations de l'utilisateur */}
//         <h3>Username: {editMode ? <input type="text" value={updatedUserData.username} onChange={(e) => setUpdatedUserData({ ...updatedUserData, username: e.target.value })} /> : username}</h3>
//         <p>Email: {email}</p>
//         <p>Address: {editMode ? <input type="text" value={updatedUserData.address} onChange={(e) => setUpdatedUserData({ ...updatedUserData, address: e.target.value })} /> : address}</p>
//         <p>Phone Number: {editMode ? <input type="text" value={updatedUserData.phoneNumber} onChange={(e) => setUpdatedUserData({ ...updatedUserData, phoneNumber: e.target.value })} /> : phoneNumber}</p>
//         {/* Affichez le bouton d'édition du profil ou le bouton de sauvegarde en fonction du mode édition */}
//         {editMode ? <button onClick={handleUpdateProfile}>Save Changes</button> : <button onClick={() => setEditMode(true)}>Edit Profile</button>}
//       </div>
//     </div>
//   );
// };

// export default UserAccount;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserAccount = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [userData, setUserData] = useState({ ...userInfo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9005/api/v1/updateUser', {
        method: 'PUT', // or 'PATCH' depending on your backend implementation
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log(data); // handle success or error response from server
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <h2>User Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </label>
        {/* Add more input fields for other user data */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserAccount;