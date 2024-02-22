import React from 'react';
import logo from "../assets/img/logo.png";

function Footer() {
  return (
    <footer>
      <img className='footer-logo' src={logo} alt="logo miel d'orient" />
      <div className="social-media-links">
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
      <p>&copy; 2024 Miel d'Orient. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;