
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../store/slice/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username,
        password
      };

      const response = await fetch('http://localhost:9005/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials : "include",
        body: JSON.stringify(data)
      });
     
      if (response.ok) {
        const resJson = await response.json();
        console.log(resJson);
        dispatch(updateStatus({ ...resJson ,username : resJson.username, role : resJson.role , id : resJson.id , firstname: resJson.firstname, email : resJson.email}));
        setShowConfirmation(true);
    
          if (resJson.role === 'admin') {
    
            navigate('/dashboard');
          } 
          // else {
            //   navigate('/articles');
            // }
            else setTimeout(() => {
              navigate('/articles');
            }, 3000);

      } else {
        console.error('Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête fetch:', error);
    }
  };

  return (
    <div className='container-connexion'>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      {showConfirmation && (
        <div className="confirmation-slide">
          Connexion réussie!   
        </div>
      )}
    </div>
  );
};

export default Login;