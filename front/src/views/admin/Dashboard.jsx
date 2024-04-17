import React from 'react';
import { Link } from 'react-router-dom';



const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <div className='container category'>
      <Link to="/admin/dashboard/categories">Ajouter une catégorie</Link> 
      </div>
      <div className='container modify-category'>
      <Link to="/admin/dashboard/categories/modifier">Modifier une catégorie</Link> 
      </div>
      <div className='container article'>
      <Link to="/admin/dashboard/articles/ajouter">Ajouter un article</Link> 
      </div>
      <div className='container modify-article'>
        <Link to="/admin/dashboard/articles/modifier">Modifier un article</Link>
      </div>
      <div className='container stats'>
      <Link to="/admin/dashboard/statistiques">Statistiques</Link> 
      </div>
    </div>
  );
};

export default Dashboard;