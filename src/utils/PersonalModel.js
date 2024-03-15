// usePersonalData.js
import { useParams } from 'react-router-dom';
import useFetch from '../components/Hook'; // Assurez-vous que le chemin d'accès est correct
import dataPerso from '../../public/dataPerso.json'; // Assurez-vous que le chemin d'accès est correct

const USEAPI = false; // Basculer entre l'utilisation des données de l'API ou locales

export function getDataForPersoChart() {
    const { id } = useParams();
    let dynamicData, loading, error;

    if (USEAPI) {
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}`));
        if (!loading) {

            dynamicData = dynamicData.data
        }
    } else {
        const userFound = dataPerso.USER_MAIN_DATA.find(user => user.id.toString() === id);
        if (!userFound) {
            setError("User not found");
            setLoading(false);
            return;
        }
        dynamicData = userFound;
    }
    loading = false;
    error = false;

    if (loading) {
        return { loading };
    }
    
    if (error || !dynamicData) {
        return { error: true };
    }

    return { loading, error, dynamicData };
}