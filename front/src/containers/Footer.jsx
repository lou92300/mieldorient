import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../assets/img/logo.png";

function Footer() {
  return (
    <footer>
      <img className='footer-logo' src={logo} alt="logo miel d'orient" />
      <div className="social-media-links">
        <a href="https://facebook.com">
          <FontAwesomeIcon icon={faFacebookF} size="2x" className='facebook-icon'/> 
        </a>
        <a href="https://twitter.com">
          <FontAwesomeIcon icon={faTwitter} size="2x" className='twitter-icon'/> 
        </a>
        <a href="https://instagram.com">
          <FontAwesomeIcon icon={faInstagram} size="2x" className='instagram-icon' /> 
        </a>
      </div>
      <div className="terms-privacy">
        <a href="/terms">Conditions d'utilisation</a>
        <a href="/privacy">Politique de confidentialité</a>
      </div>
      <p>&copy; 2024 Miel d'Orient. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;