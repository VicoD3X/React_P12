import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../ScoreChart/Scorechart.css';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from 'recharts';

const Stats = () => {
    const { id } = useParams();
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/`);

    if (loading) {
        return <p>Chargement...</p>;
    }

    const score = dynamicData.data && (dynamicData.data.todayScore !== undefined ? dynamicData.data.todayScore : dynamicData.data.score);

    if (error || !dynamicData || !dynamicData.data || score === undefined) {
        return <p>Données non disponibles ou format incorrect</p>;
    }

    const radialData = [{
        name: 'Score',
        score: score * 100,
        fill: '#E60000',
    }];

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <div className="custom-legend">
                <p className="legend-score">{payload[0].payload.score}%</p>
                <p className="legend-text">de votre objectif</p>
            </div>
        );
    };

    return (
        <div className='ScoreContain'>
            {<h3 className='scoreTxt'>Score</h3>}
            <ResponsiveContainer width='100%' height={300}>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="80%"
                    barSize={10}
                    data={radialData}
                    startAngle={90}
                    endAngle={500}
                    style={{
                        backgroundColor: '#FFFFFF', clipPath: 'circle(105px at 50% 50%)'
                    }}
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} fill="#000000" />
                    <RadialBar
                        cornerRadius="10"
                        minAngle={15}
                        // background={true}
                        background={{ fill: '#f5f5f5' }}
                        clockWise
                        dataKey="score"
                    // fill="#FFF000"

                    />
                    <Legend
                        content={renderLegend}
                        verticalAlign="middle"
                        align="center"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
