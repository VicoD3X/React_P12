import { getDataForRadarChart } from '../../utils/RadarModel'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../RadarChart/Radarchart.css';

const Stats = () => {

    // Récupère les états de chargement, d'erreur et les données formatées pour le graphique radar
    const { loading, error, radarData } = getDataForRadarChart();

    // Si les données sont encore en cours de chargement, affiche un message d'attente
    if (loading) {
        return <p>Chargement...</p>;
    }

    // Affiche un message d'erreur si un problème survient lors de la récupération des données
    if (error) {
        return <p>Données non disponibles ou format incorrect</p>;
    }


    return (
        <div className='RadarContain'>
            {/* Conteneur réactif pour le RadarChart. */}
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                    cx="50%" // Centre le graphique sur l'axe X.
                    cy="50%" // Centre le graphique sur l'axe Y.
                    outerRadius="80%" // Rayon externe du graphique radar.
                    data={radarData} // Données du graphique.
                    margin={{
                        top: 0,
                        right: 60,
                        bottom: 0,
                        left: 58,
                    }}
                    innerRadius={10}
                >
                    <PolarGrid stroke="#FFFFFF" />
                    <PolarAngleAxis
                        dataKey="subject" // Axe des angles basé sur les sujets (disciplines).
                        stroke="#FFFFFF" // Couleur de l'axe des angles.
                        tickLine={false}
                        axisLine={false}
                        dy={2.5}
                    />
                    <Radar
                        name="Performance" // Nom de la série de données.
                        dataKey="A" // Clé des données pour les valeurs de performance.
                        stroke="#E60000" // Couleur du contour du radar.
                        fill="#E60000" // Couleur de remplissage du radar.
                        fillOpacity={0.7} // Opacité du remplissage.
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
