import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='notfound'>
      <h1>404 - Page non trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <Link to="/">Retourner à la page d'accueil</Link>
    </div>
  );
};

export default PageNotFound;