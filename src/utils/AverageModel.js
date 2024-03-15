import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataAverage from '../../public/dataAverage.json';

const USEAPI = false;


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