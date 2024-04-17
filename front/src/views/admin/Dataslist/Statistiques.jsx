import { useState, useEffect } from 'react';

function Statistiques() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9005/api/v1/admin/stats', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        console.log(response)

        if (!response) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        setStats(data);
        console.log(data)
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des statistiques : ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='stats-container'>
      <h1>Statistiques</h1>
      {stats ? (
        <div>
          <p>Nombre d'utilisateurs: {stats.users.length}</p>
          <ul>
            {stats.users.map((user, index) => (
              <li key={index}>
                Pseudo: {user.username},
                Prénom: {user.firstname ? user.firstname : 'N/A'},
                Email:{user.email},
                Pays:{user.country}
              </li>
            ))}
          </ul>
          <p>Nombre total de catégories: {stats.categories.length}</p>
          <ul>
            {stats.categories.map((category, index) => (
              <li key={index}>
                Nom de la catégorie: {category.name}
              </li>
            ))}
          </ul>
          <p>Nombre de produits: {stats.products.length}</p>
          <ul>
            {stats.products.map((product, index) => (
              <li key={index}>
              
                Nom du produit: {product.name}, Prix: {product.price}, Stock: {product.stock}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement des statistiques...</p>
      )}
    </div>
  );
}

export default Statistiques;


