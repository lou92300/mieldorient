import React from 'react';
import { Link } from 'react-router-dom';
import "./style/styles.scss"

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <button>
        <Link to="/articles">Articles</Link>
      </button>
      <button>
        <Link to="/user-account">Mon Compte</Link>
      </button>
      <button>
        <Link to="/admin">Admin</Link>
      </button>
    </div>
  );
};

export default Dashboard;