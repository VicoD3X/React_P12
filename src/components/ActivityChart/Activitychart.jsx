import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../ActivityChart/ActivityChart.css';

// Composant personnalisé pour l'affichage de l'infobulle
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{
                backgroundColor: '#E60000',
                padding: '1px',
                minWidth: '100px',
                border: '1px solid #fff'
            }}>
                <p className="label" style={{ color: '#fff', margin: '15px' }}>{`${payload[0].value} kg`}</p>
                <p className="label" style={{ color: '#fff', margin: '15px' }}>{`${payload[1].value} Kcal`}</p>
            </div>
        );
    }

    return null;
};

const Stats = () => {
    const { id } = useParams();
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/activity`);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return <p>Données non disponibles ou format incorrect</p>;
    }

    // Crée un tableau de données pour le graphique
    const dataForChart = dynamicData.data.sessions.map((session, index) => ({
        name: `Jour ${index + 1}`,
        kg: session.kilogram,
        Kcal: session.calories
    }));

    return (
        <div className='ActivityContain'>
            <div className="chart-header">
                <h2 className='chart-title'>Activité quotidienne</h2>
                <div className="chart-legend">
                    <span className="legend-item"><span className="legend-color-box" style={{ backgroundColor: "#000000" }}></span>Poids (kg)</span>
                    <span className="legend-item"><span className="legend-color-box" style={{ backgroundColor: "#FF0000" }}></span>Calories brûlées (kCal)</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataForChart}>
                    <CartesianGrid stroke="#AAAAAA" vertical={false} strokeDasharray='3 3' />
                    <XAxis dataKey="name" stroke="#000000" padding={{ left: -35, right: -35 }} tickMargin={16} />
                    <YAxis yAxisId="kg" orientation="right" stroke="grey" axisLine={false} tickLine={false}
                        domain={[(dataMin) => Math.floor(dataMin) - 3, (dataMax) => Math.ceil(dataMax) + 3]} />
                    <YAxis yAxisId="cal" orientation="left" hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="kg" fill="#000000" barSize={15} radius={[10, 10, 0, 0]} yAxisId="kg" />
                    <Bar dataKey="Kcal" fill="#FF0000" barSize={15} radius={[10, 10, 0, 0]} yAxisId="cal" />

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default Stats;
