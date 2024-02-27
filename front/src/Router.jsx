import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Article from './pages/Article';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './views/admin/Dashboard';
import UserAccount from './views/user/UserAccount';
import AddCategory from './views/admin/Dataslist/AddCategory';

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.userInfo?.role);

  useEffect(() => {
    async () => {
      try {
        const response = await fetch("http://localhost:9005/api/v1/check-token", {
          method: 'GET',
          credentials: 'include' // Inclure les cookies dans la demande
        });
        const data = await response.json();
        if (data.error) {
          // Si une erreur est retournée, redirigez l'utilisateur vers la page de connexion
          navigate('/connexion');
        }
        console.log(data);
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
      }
    };
    
 
    
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
    if (location.pathname === "/dashboard") {
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      if (!role) {
        navigate('/connexion');
      }
    }
  }, [location, navigate, role]); // Assurez-vous de dépendre de location, navigate et role pour éviter les avertissements

  return (
    <Routes>
      <Route path="/articles" element={<Article />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-account" element={<UserAccount />} />
      {role === "admin" && <Route path="/admin/add-category" element={<AddCategory />} />}
    </Routes>
  );
};

export default Router;