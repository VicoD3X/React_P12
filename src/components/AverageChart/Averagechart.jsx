import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Rectangle, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../AverageChart/Averagechart.css';

// Composant personnalisé pour l'affichage de l'infobulle avec un fond sombre
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {  // Vérifie si l'infobulle doit être affichée
        return (
            <div className="custom-tooltip">
                {/* Affiche la valeur de la durée en minutes */}
                <p className="label">{`${payload[0].value} min`}</p>
            </div>
        );
    }

    return null;
};

const Stats = () => {
    const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/average-sessions`);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return <p>Données non disponibles ou format incorrect</p>;
    }
    const dayOfWeekMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D',]; // Map pour convertir les jours en abréviations

    const data = dynamicData.data.sessions.map((session) => ({
        ...session,
        day: dayOfWeekMap[(session.day - 1) % 7], // Convertit le numéro du jour en abréviation
    }));

    // Composant personnalisé pour le curseur du graphique
    const CustomCursorArea = ({ points }) => {
        return <Rectangle fill="#000000" opacity={0.1} x={points[0].x} width={500} height={400} rx="15" />; // Dessine un rectangle pour le curseur
    };

    return (
        <div className='AverageContain'> 
            <div className="chartverage-header"> 
                <h2 className='chartverage-title'>Durée moyenne des sessions</h2> 
            </div>
            <ResponsiveContainer width="100%" height={350} > 
                <LineChart
                    data={data}                                                // Données du graphique
                    margin={{ top: 80, right: 10, left: 10, bottom: 20 }}      // Marges autour du graphique
                >
                    <XAxis
                        dataKey="day"                   // Clé des données pour l'axe X (jours)
                        textAnchor='middle'             // Alignement du texte des ticks
                        axisLine={false}                // Cache la ligne de l'axe
                        dominantBaseline={'central'}    // Alignement vertical des ticks
                        tick={{ fill: 'white' }}        // Couleur des ticks
                        domain={['auto', 'auto']}       // Domaine automatique pour l'axe X
                        padding={{ left: 0, right: 0 }} // Padding de l'axe X
                        tickCount={10} dx={-0} allowDataOverflow={true}        // Configuration supplémentaire de l'axe X
                    />
                    <YAxis
                        hide={true}                     // Cache l'axe Y
                        domain={['dataMin-10', 'dataMax + 5']}                 // Domaine de l'axe Y avec une marge
                    />
                    <Tooltip
                        content={<CustomTooltip />}     // Utilise l'infobulle personnalisée
                        cursor={<CustomCursorArea />}   // Utilise le curseur personnalisé
                        offset={-60}                    // Décale l'infobulle
                    />
                    <Line
                        type="natural"                 // Type de la ligne (courbe naturelle)
                        dataKey="sessionLength"        // Clé des données pour la longueur des sessions
                        stroke="#FFFFFF"               // Couleur de la ligne
                        dot={false}                    // Désactive les points sur la ligne
                    />
                </LineChart>

            </ResponsiveContainer>
        </div>

    );
};

export default Stats;
