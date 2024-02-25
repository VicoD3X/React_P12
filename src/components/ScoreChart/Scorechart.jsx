import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../ScoreChart/Scorechart.css';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from 'recharts';

const Stats = () => {
    const { id } = useParams();
    // Utilisation du hook useFetch pour charger les données de l'utilisateur depuis une API.
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/`);

    // Affichage d'un message de chargement pendant la récupération des données.
    if (loading) {
        return <p>Chargement...</p>;
    }

    // Calcul du score de l'utilisateur, en gérant la possibilité de champs de données différents.
    const score = dynamicData.data && (dynamicData.data.todayScore !== undefined ? dynamicData.data.todayScore : dynamicData.data.score);

    // Affichage d'un message d'erreur si une erreur survient ou si les données ne sont pas dans le format attendu.
    if (error || !dynamicData || !dynamicData.data || score === undefined) {
        return <p>Données non disponibles ou format incorrect</p>;
    }

    // Préparation des données pour le graphique radial, en convertissant le score en pourcentage.
    const radialData = [{
        name: 'Score',
        score: score * 100,
        fill: '#E60000',
    }];

    // Fonction personnalisée pour afficher la légende du graphique.
    const renderLegend = (props) => {
        // Extraction de payload depuis les props. 'payload' contient les données passées à la légende.
        const { payload } = props;
        return (
            <div className="custom-legend">
                <p className="legend-score">{payload[0].payload.score}%</p>
                {/* accède à la valeur de 'score' dans le premier élément du tableau 'payload'. */}
                <p className="legend-text">de votre objectif</p>
            </div>
        );
    };

    // Rendu du graphique radial en utilisant le composant RadialBarChart de Recharts.
    return (
        // Conteneur div pour le graphique, avec une classe pour l'appliquer du style spécifique.
        <div className='ScoreContain'>
            <h3 className='scoreTxt'>Score</h3>
            {/* Conteneur réactif qui ajuste la taille du graphique à ses conteneurs parent. */}
            <ResponsiveContainer width='100%' height={300}>
                <RadialBarChart
                    cx="50%"                      // Centre le graphique sur l'axe X à 50% du conteneur.
                    cy="50%"                      // Centre le graphique sur l'axe Y à 50% du conteneur.
                    innerRadius="70%"             // Rayon intérieur du graphique à 70% du rayon total.
                    outerRadius="80%"             // Rayon extérieur du graphique à 80% du rayon total.
                    barSize={10}                  // La largeur de la barre du graphique.
                    data={radialData}             // Les données passées au graphique.
                    startAngle={90}               // Angle de départ du graphique.
                    endAngle={500}                // Angle de fin du graphique.
                    style={{
                        backgroundColor: '#FFFFFF',               // Couleur de fond du graphique.
                        clipPath: 'circle(105px at 50% 50%)'      // Applique un masque circulaire au graphique.
                    }}
                >
                    {/* // Axe polaire pour le graphique */}
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} fill="#000000" />
                    {/* La barre radiale principale, configurée avec une couleur de fond, un rayon de coin, et d'autres propriétés. */}
                    <RadialBar
                        cornerRadius="10"          // Arrondit les coins de la barre.
                        minAngle={15}              // Angle minimum pour assurer que la barre est visible même avec de petites valeurs.
                        background={{ fill: '#f5f5f5' }}          // Couleur de fond pour la barre.
                        clockWise                  // Indique si le remplissage doit se faire dans le sens horaire.
                        dataKey="score"            // Clé des données utilisées pour déterminer la longueur de la barre.
                    />
                    {/* Légende personnalisée pour le graphique, affichée au centre. */}
                    <Legend
                        content={renderLegend}                   // Fonction de rendu pour la légende personnalisée.
                        verticalAlign="middle"                   // Alignement vertical de la légende.
                        align="center"                           // Alignement horizontal de la légende.
                    />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
