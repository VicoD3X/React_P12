import { getDataForScoreChart } from '../../utils/ScoreModel';
import '../ScoreChart/Scorechart.css';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from 'recharts';

const Stats = () => {
    const { loading, error, radialData, score } = getDataForScoreChart();

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Données non disponibles ou format incorrect</p>;
    }

    // Fonction personnalisée pour afficher la légende du graphique.
    const renderLegend = (props) => {
        return (
            <div className="custom-legend">
                <p className="legend-score">{score}%</p>
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
                    innerRadius="68.5%"             // Rayon intérieur du graphique à 70% du rayon total.
                    outerRadius="85%"             // Rayon extérieur du graphique à 80% du rayon total.
                     barSize={15}                  // La largeur de la barre du graphique.
                    data={radialData}             // Les données passées au graphique.
                    startAngle={90}               // Angle de départ du graphique.
                    endAngle={500}                // Angle de fin du graphique.
                    style={{
                        backgroundColor: '#FFFFFF',               // Couleur de fond du graphique.
                        clipPath: 'circle(100px at 50% 50%)'      // Applique un masque circulaire au graphique.
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
