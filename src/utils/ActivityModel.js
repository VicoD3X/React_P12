
import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataActivity from '../../public/dataActivity.json';

const USEAPI = false;




export function getDataForActivityChart() {
    const { id } = useParams();
    let dynamicData, loading, error; // Déclaration au niveau supérieur de la fonction

    if (USEAPI) {
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/activity`));
    } else {
        const userActivity = dataActivity.USER_ACTIVITY.find(user => user.userId.toString() === id);
        if (!userActivity || !userActivity.sessions) {
            return { error: true };
        }
        dynamicData = { data: userActivity };
        loading = false;
        error = false;
    }

    if (loading) {
        return { loading };
    }

    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return { error: true };
    }

    const dataForChart = dynamicData.data.sessions.map((session, index) => ({
        name: `Jour ${index + 1}`,
        kg: session.kilogram,
        Kcal: session.calories
    }));

    return { loading, error, dataForChart };
}
