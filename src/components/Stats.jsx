import useFetch from './Hook';
import { useParams } from 'react-router-dom';
import Activitychart from '../components/ActivityChart/Activitychart'
import Averagechart from '../components/AverageChart/Averagechart'
import Radarchart from '../components/RadarChart/Radarchart'
import Scorechart from '../components/ScoreChart/Scorechart'

// Le composant fonctionnel Stats est utilisé pour afficher les statistiques de l'utilisateur.
const Stats = () => {
  // Extraction de l'ID de l'utilisateur depuis l'URL avec le hook useParams.
  const { id } = useParams();
  // Utilisation du hook personnalisé useFetch pour charger les données dynamiques de l'utilisateur depuis une API.
  const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}`);


  // Vérification de la présence et de la structure correcte des données clés
  if (!dynamicData || !dynamicData.data || !dynamicData.data.keyData) {
    return loading ? <p>Chargement...</p> : <p>Données non disponibles ou format incorrect</p>;
  }

  // Gère l'affichage en cas de chargement ou d'erreur
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;




  return (
    <>
      {/* Composant pour afficher le graphique d'activité de l'utilisateur. */}
      <Activitychart />
      <div className='statLine'>

        {/* Composants pour afficher différents types de graphiques statistiques. */}
        <Averagechart />
        <Radarchart />
        <Scorechart />
      </div>
    </>
  );
}

export default Stats;
