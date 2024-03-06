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

        if (!response.ok) {
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
    <div>
      <h1>Statistiques</h1>
      {stats ? (
        <div>
          {/* Afficher les données récupérées */}
          <p>Nombre d'utilisateurs {stats.totalUsers}</p>
          <p>Nombre d'utilisateurs {stats.users}</p>
          {/* Affichez d'autres données selon la structure de votre réponse */}
        </div>
      ) : (
        <p>Chargement des statistiques...</p>
      )}
    </div>
  );
}

export default Statistiques;