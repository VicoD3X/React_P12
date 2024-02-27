// Importations nécessaires
import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataActivity from '../../public/dataActivity.json';
import dataAverage from '../../public/dataAverage.json';

const USEAPI = true;




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



export function getDataForAverageChart() {
    const { id } = useParams();
    let dynamicData, loading, error;

    if (USEAPI) {
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/average-sessions`));
    } else {
        const userAverage = dataAverage.USER_AVERAGE_SESSIONS.find(user => user.userId.toString() === id);
        if (!userAverage || !userAverage.sessions) {
            return { error: true };
        }
        dynamicData = { data: userAverage };
        loading = false;
        error = false;
    }

    if (loading) {
        return { loading };
    }

    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return { error: true };
    }

    const dayOfWeekMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const data = dynamicData.data.sessions.map((session) => ({
        ...session,
        day: dayOfWeekMap[(session.day - 1) % 7],
    }));

    return { loading, error, data };
}


