import { useEffect } from 'react'; 
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import Article from '../pages/Article';
import Registration from '../pages/Registration'; 
import Login from '../pages/Login'; 
import Dashboard from '../views/admin/Dashboard'; 
import UserAccount from '../views/user/UserAccount'; 
import AddCategory from '../views/admin/Dataslist/AddCategory'; 
import Statistiques from '../views/admin/Dataslist/Statistiques'; 
import Home from '../pages/Home';
import NewArticles from '../views/admin/Dataslist/NewArticles';
import UpdateArticles from '../views/admin/Dataslist/UpdateArticles';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import UpdateCategory from '../views/admin/Dataslist/UpdateCategory';

const Router = () => { 
  const location = useLocation(); // Utilisation du hook useLocation pour obtenir l'URL actuelle
  const navigate = useNavigate(); 
  const role = useSelector((state) => state.user.userInfo?.role); // Utilisation du hook useSelector pour extraire le rôle de l'utilisateur depuis l'état global de Redux

  useEffect(() => { // Utilisation du hook useEffect pour exécuter une fonction au montage du composant ou lorsque les dépendances changent
    async () => { 
      try {
        const response = await fetch("http://localhost:9005/api/v1/check-token", { // Requête GET pour vérifier le token de l'utilisateur
          method: 'GET',
          credentials: 'include' // Inclure les cookies dans la demande
        });
        const data = await response.json(); 
        if (data.error) { // Vérification si une erreur est retournée
          // Si une erreur est retournée, redirigez l'utilisateur vers la page de connexion
          navigate('/connexion');
        }
        // console.log(data); // Affichage des données récupérées
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error); // Gestion des erreurs en cas d'échec de la requête
      }
    };
    
    // Vérification des conditions de navigation en fonction de l'URL actuelle et du rôle de l'utilisateur
    if (location.pathname === "/user-account") { // Vérifie si l'utilisateur accède à la route User Account
      if (!role) { // Vérifie si l'utilisateur n'est pas connecté
        navigate('/connexion'); // Redirige l'utilisateur vers la page de connexion
      } else if (role !== "utilisateur") { // Vérifie si l'utilisateur a le rôle d'utilisateur
        navigate('/dashboard'); // Redirige l'utilisateur vers le dashboard
      }
    }

    if (location.pathname === "/dashboard") { // Vérifie si l'utilisateur accède à la route Dashboard
      if (!role) { // Vérifie si l'utilisateur n'est pas connecté
        navigate('/connexion'); // Redirige l'utilisateur vers la page de connexion
      }
    }
  }, [location, navigate, role]); // Dépendances du hook useEffect pour éviter les boucles infinies

  return (
    <Routes> // Utilisation du composant Routes pour définir les routes de l'application
      <Route path="/" element={<Home/>}/>
      <Route path="/accueil" element={<Home/>}/>
      <Route path="/articles" element={<Article />} /> // Définition de la route "/articles" avec le composant Article
      <Route path="/registration" element={<Registration />} /> // Définition de la route "/registration" avec le composant Registration
      <Route path="/connexion" element={<Login />} /> // Définition de la route "/connexion" avec le composant Login
      <Route path="/dashboard" element={<Dashboard />} /> // Définition de la route "/dashboard" avec le composant Dashboard
      <Route path="/user-account" element={<UserAccount />} /> // Définition de la route "/user-account" avec le composant UserAccount
      <Route path="/privacy" element={<Privacy />} /> // Définition de la route "/user-account" avec le composant UserAccount
      <Route path="/terms" element={<Terms />} /> // Définition de la route "/user-account" avec le composant UserAccount
      {role === "admin" && ( // Vérifie si l'utilisateur a le rôle d'administrateur
      <> // Utilisation de la syntaxe de fragment
        <Route path="/admin/dashboard/categories" element={<AddCategory />} /> // Définition de la route "/admin/categories" avec le composant AddCategory
        <Route path="/admin/dashboard/categories/modifier" element={<UpdateCategory />} /> // Définition de la route "/admin/categories" avec le composant AddCategory
        <Route path="/admin/dashboard/articles/ajouter" element={<NewArticles />} /> // Définition de la route "/admin/articles" avec le composant AddArticles
        <Route path="/admin/dashboard/articles/modifier" element={<UpdateArticles />} /> // Définition de la route "/admin/articles" avec le composant AddArticles
        <Route path="/admin/dashboard/statistiques" element={<Statistiques />} /> // Définition de la route "/admin/statistiques" avec le composant Statistiques
      </>
    )}
    </Routes>
  );
};

export default Router; 
