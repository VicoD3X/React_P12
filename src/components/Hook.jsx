import { useState, useEffect } from 'react';

// useFetch Hook
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
                // Ce code s'exécute après `then` ou `catch`, peu importe le résultat
                // Par exemple, arrêter une animation de chargement
            }
        };

        fetchData();
    }, [url]); // Exécute ce code lorsque l'URL change

    return { data, loading, error };
}

export default useFetch;
