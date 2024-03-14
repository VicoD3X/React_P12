import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataScore from '../../public/dataPerso.json';

const USEAPI = true; // Ajustez cette valeur selon si vous souhaitez utiliser l'API ou les données locales

export function getDataForScoreChart() {
    const { id } = useParams();
    let dynamicData, loading, error;

    if (USEAPI) {
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/`));
    } else {
        const userScoring = dataScore.USER_MAIN_DATA.find(user => user.id.toString() === id);
        if (!userScoring || (userScoring.score === undefined && userScoring.todayScore === undefined)) {
            return { error: true };
        }
        dynamicData = { data: userScoring };
        loading = false;
        error = false;
    }

    if (loading) return { loading };
    if (error || !dynamicData || !dynamicData.data) return { error: true };

    // Assurez-vous de multiplier le score par 100 pour convertir en pourcentage
    const score = dynamicData.data.todayScore !== undefined ? dynamicData.data.todayScore * 100 : dynamicData.data.score * 100;

    const radialData = [{
        name: 'Score',
        score: score, // Cette valeur est déjà en pourcentage
        fill: '#E60000',
    }];

    return { loading, error, score, radialData };
}

