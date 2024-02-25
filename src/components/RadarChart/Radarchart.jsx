
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../RadarChart/Radarchart.css';

const Stats = () => {
    const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL.
    // Charge les données de performance de l'utilisateur via un appel API.
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/performance`);

    if (loading) {
        return <p>Chargement...</p>;
    }

    // Affiche un message d'erreur si une erreur survient ou si les données ne sont pas disponibles.
    if (error || !dynamicData || !dynamicData.data) {
        return <p>Données non disponibles ou format incorrect</p>;
    }

    // Extraction des données nécessaires à partir de la réponse de l'API.
    const { kind, data } = dynamicData.data;

    // Préparation des données pour être utilisées dans le RadarChart.
    const radarData = data.map(perf => ({
        subject: kind[perf.kind],      // Utilise l'objet 'kind' pour convertir les identifiants en noms de disciplines.
        A: perf.value,                 // Valeur de performance pour chaque discipline.
        fullMark: 200                  // La valeur maximale pour le graphique
    }));

    return (
        <div className='RadarContain'>
            {/* Conteneur réactif pour le RadarChart. */}
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                    cx="50%" // Centre le graphique sur l'axe X.
                    cy="50%" // Centre le graphique sur l'axe Y.
                    outerRadius="80%" // Rayon externe du graphique radar.
                    data={radarData} // Données du graphique.
                >
                    <PolarGrid stroke="#FFFFFF" />
                    <PolarAngleAxis
                        dataKey="subject" // Axe des angles basé sur les sujets (disciplines).
                        stroke="#FFFFFF" // Couleur de l'axe des angles.
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
