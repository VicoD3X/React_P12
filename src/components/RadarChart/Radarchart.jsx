
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../RadarChart/Radarchart.css';

const Stats = () => {
    const { id } = useParams();
    const { data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/performance`);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error || !dynamicData || !dynamicData.data) {
        return <p>Données non disponibles ou format incorrect</p>;
    }

    // Assurez-vous que la réponse de l'API a la structure attendue
    const { kind, data } = dynamicData.data;

    // Convertir les données pour le RadarChart
    const radarData = data.map(perf => ({
        subject: kind[perf.kind],
        A: perf.value,
        fullMark: 200 // La valeur maximale pour le graphique
    }));

    return (
        <div className='RadarContain'>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#FFFFFF" />
                    <PolarAngleAxis dataKey="subject" stroke="#FFFFFF" />
                    <Radar name="Performance" dataKey="A" stroke="#E60000" fill="#E60000" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>

    );
};

export default Stats;
