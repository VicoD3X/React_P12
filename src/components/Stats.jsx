import useFetch from './Hook';
import { useParams } from 'react-router-dom';
import Activitychart from '../components/ActivityChart/Activitychart'
import Averagechart from '../components/AverageChart/Averagechart'
import Radarchart from '../components/RadarChart/Radarchart'
import Scorechart from '../components/ScoreChart/Scorechart'

const Stats = () => {
  const { id } = useParams();
  // Récupérer les données dynamiques
  const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}`);
  console.log(dynamicData);
  if (!dynamicData || !dynamicData.data || !dynamicData.data.keyData) {
    // Si les données sont absentes ou ne sont pas bien structurées, retourne un message ou un indicateur de chargement
    return loading ? <p>Chargement...</p> : <p>Données non disponibles ou format incorrect</p>;
  }



  // Gestion du chargement et des erreurs
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <Activitychart />
      <div className='statLine'>
        <Averagechart />
        <Radarchart />
        <Scorechart />
      </div>
    </>
  );
}

export default Stats;
