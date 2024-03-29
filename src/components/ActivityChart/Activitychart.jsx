import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import '../ActivityChart/ActivityChart.css';
import '../../utils/ActivityModel'
import { getDataForActivityChart } from '../../utils/ActivityModel';

// Composant personnalisé pour l'affichage de l'infobulle
const CustomTooltip = ({ active, payload }) => {
    // Affiche l'infobulle uniquement lorsque celle-ci est active et contient des données.
    if (active && payload && payload.length) {
        return (
            // Conteneur de l'infobulle avec un style personnalisé.
            <div className="custom-tooltip" style={{
                backgroundColor: '#E60000',
                padding: '1px',
                minWidth: '100px',
                border: '1px solid #fff'
            }}>
                {/*  Affiche la valeur de la première donnée (kg) avec un style personnalisé. */}
                <p className="label" style={{ color: '#fff', margin: '15px' }}>{`${payload[0].value} kg`}</p>
                {/* Affiche la valeur de la seconde donnée (Kcal) avec un style similaire. */}
                <p className="label" style={{ color: '#fff', margin: '15px' }}>{`${payload[1].value} Kcal`}</p>
            </div>
        );
    }

    // Renvoie null si l'infobulle n'est pas active ou sans données, ce qui signifie qu'aucune infobulle ne sera affichée.
    return null;
};

const Stats = () => {
    
    // Récupère les états et les données du graphique d'activité
    const { loading, error, dataForChart } = getDataForActivityChart();

    // Si les données sont encore en cours de chargement, affiche un message de chargement
    if (loading) {
        return <p>Chargement...</p>;
    }

    // Si une erreur est survenue ou si les données ne sont pas dans le format attendu, affiche un message d'erreur
    if (error) {
        return <p>Données non disponibles ou format incorrect</p>;
    }


    // Rendu du graphique et de ses composants.
    return (
        <div className='ActivityContain'>
            <div className="chart-header">
                <h2 className='chart-title'>Activité quotidienne</h2>
                <div className="chart-legend">
                    <span className="legend-item">
                        <span className="legend-color-box" style={{ backgroundColor: "#000000" }}></span>
                        Poids (kg)
                    </span>
                    <span className="legend-item">
                        <span className="legend-color-box" style={{ backgroundColor: "#FF0000" }}></span>
                        Calories brûlées (kCal)
                    </span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}> {/* Conteneur réactif pour le graphique */}
                <BarChart data={dataForChart}> // BarChart avec les données d'activité
                    <CartesianGrid
                        stroke="#AAAAAA"             // Couleur des lignes de la grille
                        vertical={false}             // Grille horizontale uniquement
                        strokeDasharray='3 3'        // Style des lignes de la grille
                    />
                    <XAxis
                        dataKey="name"               // Clé des données pour l'axe X
                        stroke="#000000"             // Couleur des ticks de l'axe X
                        padding={{ left: -35, right: -35 }} // Padding pour l'alignement des barres
                        tickMargin={16}   // Marge autour des ticks de l'axe X
                    />
                    <YAxis
                        yAxisId="kg"                 // Identifiant de l'axe Y pour le poids
                        orientation="right"          // Positionnement à droite pour le poids
                        stroke="grey"                // Couleur de l'axe du poids
                        axisLine={false}             // Pas de ligne d'axe visible pour le poids
                        tickLine={false}             // Pas de lignes de tick pour le poids

                        // Domaine dynamique pour le poids
                        domain={[(dataMin) => Math.floor(dataMin) - 3, (dataMax) => Math.ceil(dataMax) + 3]} />
                    <YAxis
                        yAxisId="cal"                // Identifiant de l'axe Y pour les calories
                        orientation="left"           // Positionnement à gauche pour les calories (masqué)
                        hide                         // Axe des calories masqué
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="kg"                 // Clé des données pour les barres de poids
                        fill="#000000"               // Couleur de remplissage des barres de poids
                        barSize={15}                 // Taille des barres de poids
                        radius={[10, 10, 0, 0]}      // Arrondi des coins supérieurs des barres de poids
                        yAxisId="kg"                 // Association avec l'axe Y du poids
                    />
                    <Bar
                        dataKey="Kcal"               // Clé des données pour les barres de calories
                        fill="#FF0000"               // Couleur de remplissage des barres de calories
                        barSize={15}                 // Taille des barres de calories
                        radius={[10, 10, 0, 0]}      // Arrondi des coins supérieurs des barres de calories
                        yAxisId="cal"                // Association avec l'axe Y des calories (masqué)
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

};

export default Stats;
