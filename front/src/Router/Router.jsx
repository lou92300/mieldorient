import { useEffect } from 'react'; 
import { Routes, Route, useNavigate} from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import Article from '../views/pages/Article';
import Registration from '../views/pages/Registration'; 
import Login from '../views/pages/Login'; 
import Dashboard from '../views/admin/Dashboard'; 
import UserAccount from '../views/user/UserAccount'; 
import AddCategory from '../views/admin/Dataslist/AddCategory'; 
import Statistiques from '../views/admin/Dataslist/Statistiques'; 
import Home from '../views/pages/Home';
import Privacy from '../views/pages/Privacy';
import Terms from '../views/pages/Terms';
import NewArticles from '../views/admin/Dataslist/NewArticles';
import UpdateArticles from '../views/admin/Dataslist/UpdateArticles';
import UpdateCategory from '../views/admin/Dataslist/UpdateCategory';
import PageNotFound from '../views/pages/PageNotFound';

const Router = () => { 
  const navigate = useNavigate(); 
  const role = useSelector((state) => state.user.userInfo?.role); 


  useEffect(() => { 
    const checkToken = async () => { 
      try {
        const response = await fetch("http://localhost:9005/api/v1/check-token", { 
          method: 'GET',
          credentials: 'include' 
        });
        const data = await response.json(); 
        if (data.error) { 
          navigate('/connexion');
          
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error); 
      }
    };

    checkToken(); 
  }, [navigate]); 

  return (
    <Routes> 
      <Route path="/" element={<Home/>}/>
      <Route path="/accueil" element={<Home/>}/>
      <Route path="/articles" element={<Article />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/connexion" element={<Login />} />
      {role === "utilisateur" && (
        <Route path="/user-account" element={<UserAccount />} />
      )}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {role === "admin" && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/categories" element={<AddCategory />} />
          <Route path="/admin/dashboard/categories/modifier" element={<UpdateCategory />} />
          <Route path="/admin/dashboard/articles/ajouter" element={<NewArticles />} />
          <Route path="/admin/dashboard/articles/modifier" element={<UpdateArticles />} />
          <Route path="/admin/dashboard/statistiques" element={<Statistiques />} />
        </>
      )}
 
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;