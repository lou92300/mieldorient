import React from 'react'
import logo from "../assets/img/logo.png"

function Header() {
  return (
    <header>
      <img className='header-logo' src={logo} alt="logo miel d'orient" />
    </header>
    
  )
}

export default Header
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import logo from "../assets/img/logo.png";

// function Header() {
//   return (
//     <header>
//       <img className='header-logo' src={logo} alt="logo miel d'orient" />
//       <nav>
//           <NavLink to="#">Accueil</NavLink>
//           <NavLink to="#">Articles</NavLink>
//           <NavLink to="#">Inscription</NavLink>
//           <NavLink to="#">Connexion</NavLink>
//       </nav>
//     </header>
//   );
// }
// export default Header