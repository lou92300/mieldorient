// import React from 'react';
// import { Link ,Route  } from 'react-router-dom';
// import "./style/styles.scss"
// import Addcategory from './Dataslist/AddCategory';

// const Dashboard = () => {
//   return (
//     <div className='dashboard-container'>
//       <h1>Dashboard</h1>
//       <button>
//         <Route to="/admin/articles" component={<Addcategory/>}>Articles</Route>
//       </button>
//       <button>
//         <Link to="/user-account">Mon Compte</Link>
//       </button>
//       <button>
//         <Link to="/admin">Admin</Link>
//       </button>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./style/styles.scss";
import AddCategory from './Dataslist/AddCategory';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <Link to="/admin/articles">Articles</Link>
      <Link to="/user-account">Mon Compte</Link>
      <Link to="/admin/add-category">Ajouter une catégorie</Link> {/* Lien vers la route AddCategory */}
      <Link to="/admin">Admin</Link>

      {/* Définition des routes imbriquées */}
      {/* <Routes>
        <Route path="/admin/articles" element={<h2>Articles</h2>} />
        <Route path="/user-account" element={<h2>Mon Compte</h2>} />
        <Route path="/admin" element={<h2>Admin</h2>} />
      </Routes> */}
    </div>
  );
};

export default Dashboard;