import React from 'react'
import { Routes ,Route, useLocation, useNavigate} from 'react-router-dom'
import Article from './pages/Article'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Dashboard from './views/admin/Dashboard'
import UserAccount from './views/user/UserAccount'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.userInfo?.role);

  useEffect(() => {
    
    fetch("http://localhost:9005/api/v1/check-token", {
      method: 'GET',
      credentials: 'include' // Inclure les cookies dans la demande
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          // Si une erreur est retournée, redirigez l'utilisateur vers la page de connexion
          // navigate('/connexion')
        }
        console.log(res)
      })
      .catch(error => {
        console.error('Erreur lors de la vérification du token:', error);
      });
    // Vérifiez si l'utilisateur accède à la route User Account
    if (location.pathname === "/user-account") {
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      if (!role) {
        navigate('/connexion');
      }
      // Si l'utilisateur n'a pas le rôle requis, redirigez-le vers une autre page (par exemple, Dashboard)
      else if (role !== "utilisateur") {
        navigate('/dashboard');
      }
    }

    // Vérifiez si l'utilisateur accède à la route Dashboard
    if (location.pathname === "/dashboard") { // location.pathname.include("/dashboard")
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      if (!role) {
        navigate('/connexion');
      }
    }
  }, [location, role]); // Assurez-vous de dépendre de location, navigate et role pour éviter les avertissements

  return (
    <Routes>
      <Route path="/articles" element={<Article />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-account" element={<UserAccount />} />
    </Routes>
  );
}