import React from 'react';
import { Link } from 'react-router-dom';



const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <div className='container-category'>
      <Link to="/admin/add-category">Ajouter une catégorie</Link> {/* Lien vers la route AddCategory */}
      </div>
      <div className='container-article'>
      <Link to="/admin/add-articles">Ajouter un article</Link> {/* Lien vers la route AddArticles*/}
      </div>
      <div className='container-stats'>
      <Link to="/admin/statistiques">Statistiques</Link> {/* Lien vers la route AddArticles*/}
      </div>
    </div>
  );
};

export default Dashboard;