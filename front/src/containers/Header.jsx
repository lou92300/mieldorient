import logo from "../assets/img/logo.png";
import { useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { handleLogout } from "../store/slice/userSlice";
import FloatingCartButton from "../components/FloatingCartButton";

function Header() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const dispatch = useDispatch();
  
 
  const isLoggedIn = useSelector((state) => state.user.userInfo?.isLogged);
  // const username = useSelector((state)=>state.user.userInfo?.username)
  const role = useSelector((state)=> state.user.userInfo?.role)


  const handleLogoutClick = () => {
    dispatch(handleLogout());
    navigate("/connexion")  
  };

  useEffect(() => {
   
    const updateMedia = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    
    window.addEventListener("resize", updateMedia);

    
    return () => window.removeEventListener("resize", updateMedia);
  }, []); 

  return (
    <header>
      <img className="header-logo" src={logo} alt="logo miel d'orient" />
      <div className="menu-container">
        {isDesktop ? (
          <nav>
            <NavLink to="/accueil">Accueil</NavLink>
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
                <button onClick={handleLogoutClick}>Déconnexion</button>
              </>
            ) : (
              <>
                <NavLink to="/registration">Inscription</NavLink>
                <NavLink to="/connexion">Connexion</NavLink>
              </>
            )}
          </nav>
        ) : (
          <button onClick={toggleMenu}>Menu</button>
        )}
        {menuOpen && (
          <div>
            <nav>
              <NavLink to="/accueil">Accueil</NavLink>
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

