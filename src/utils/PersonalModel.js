// usePersonalData.js
import { useState, useEffect } from 'react';
import useFetch from '../components/Hook'; // Assurez-vous que le chemin d'accès est correct
import dataPerso from '../../public/dataPerso.json'; // Assurez-vous que le chemin d'accès est correct

const USEAPI = false; // Basculer entre l'utilisation des données de l'API ou locales

export const usePersonalData = (userId) => {
    const [data, setData] = useState({
        calorieCount: '',
        proteinCount: '',
        carbohydrateCount: '',
        lipidCount: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let userData;
            if (USEAPI) {
                try {
                    const result = await useFetch(`http://localhost:3000/user/${userId}`);
                    userData = result.data;
                } catch (e) {
                    setError(e);
                    setLoading(false);
                    return;
                }
            } else {
                const userFound = dataPerso.USER_MAIN_DATA.find(user => user.userId.toString() === userId);
                if (!userFound) {
                    setError("User not found");
                    setLoading(false);
                    return;
                }
                userData = { data: userFound };
            }

            if (userData && userData.data && userData.data.keyData) {
                const { keyData } = userData.data;
                setData({
                    calorieCount: keyData.calorieCount || '',
                    proteinCount: keyData.proteinCount || '',
                    carbohydrateCount: keyData.carbohydrateCount || '',
                    lipidCount: keyData.lipidCount || '',
                });
            }
            setLoading(false);
        };

        fetchData();
    }, [userId]); // Se déclenche lorsque userId change

    return { data, loading, error };
};
