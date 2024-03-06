import logo from "../assets/img/logo.png";
import {useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../store/slice/userSlice"; // Importez votre action de déconnexion
import FloatingCartButton from "../components/FloatingCartButton";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const dispatch = useDispatch();
  
  // Accédez à l'état de connexion depuis le store Redux
  const isLoggedIn = useSelector((state) => state.user.userInfo?.isLogged);
  const username = useSelector((state)=>state.user.userInfo?.username)
  const role = useSelector((state)=> state.user.userInfo?.role)

  // Fonction pour gérer la déconnexion
  const handleLogoutClick = () => {
    dispatch(handleLogout()); // Dispatch de l'action de déconnexion
    //mettre redirection
  };

  useEffect(() => {
    // Votre code d'effet ici...
  }, []); 

  return (
    <header>
      <img className="header-logo" src={logo} alt="logo miel d'orient" />
      <div className="menu-container">
        <button onClick={toggleMenu}>Menu</button>
        {menuOpen && (
          <div>
            <nav>
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/articles">Articles</NavLink>
              {isLoggedIn ? (
                <>
                {role === "utilisateur"  && (
                  <NavLink to ="/user-account">Mon compte</NavLink>
                )}
                {
                  role === "admin" && (
                    <NavLink to ="/dashboard">Dashboard</NavLink>
                  )
                }
                  {/* <span>Connecté</span> */}
                  <button onClick={handleLogoutClick}>Déconnexion</button>
                </>
              ) : (
                <>
                  <NavLink to="/registration">Inscription</NavLink>
                  <NavLink to="/connexion">Connexion</NavLink>
                </>
              )}
            </nav>
          </div>
        )}
        <FloatingCartButton/>
      </div>
    </header>
  );
}

export default Header;