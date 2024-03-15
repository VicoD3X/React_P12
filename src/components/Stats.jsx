
import Activitychart from '../components/ActivityChart/Activitychart'
import Averagechart from '../components/AverageChart/Averagechart'
import Radarchart from '../components/RadarChart/Radarchart'
import Scorechart from '../components/ScoreChart/Scorechart'

// Le composant fonctionnel Stats est utilisé pour afficher les statistiques de l'utilisateur.
const Stats = () => {





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
