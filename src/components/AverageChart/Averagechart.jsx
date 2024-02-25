import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Rectangle, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../AverageChart/Averagechart.css';

// Composant personnalisé pour l'affichage de l'infobulle avec un fond sombre
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].value} min`}</p>
            </div>
        );
    }

    return null;
};

const Stats = () => {
    const { id } = useParams();
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/average-sessions`);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return <p>Données non disponibles ou format incorrect</p>;
    }
    const dayOfWeekMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D',];

    const data = dynamicData.data.sessions.map((session) => ({
        ...session,
        day: dayOfWeekMap[(session.day - 1) % 7],
    }));

    const CustomCursorArea = ({ points }) => {
        return <Rectangle fill="#000000" opacity={0.1} x={points[0].x} width={500} height={400} rx="15" />;
    };

    return (
        <div className='AverageContain'>
            <div className="chartverage-header">
                <h2 className='chartverage-title'>Durée moyenne des sessions</h2>
            </div>
            <ResponsiveContainer width="100%" height={350} >
                <LineChart data={data} margin={{ top: 80, right: 10, left: 10, bottom: 20 }}>
                    <XAxis dataKey="day" textAnchor='middle' axisLine={false}  dominantBaseline={'central'} tick={{ fill: 'white' }} domain={['auto', 'auto']} padding={{left: 0, right: 0}} tickCount={10} dx={-0} allowDataOverflow={true} />
                    <YAxis hide={true} domain={['dataMin-10', 'dataMax + 5']} />
                    <Tooltip content={<CustomTooltip />}
                        cursor={<CustomCursorArea />}
                        offset={-60} />
                    <Line
                        type="natural"
                        dataKey="sessionLength"
                        stroke="#FFFFFF"
                        dot={false} />
                </LineChart>
                
            </ResponsiveContainer>
        </div>

    );
};

export default Stats;
