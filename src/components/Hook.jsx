import { useState, useEffect } from 'react';

// Définition du hook personnalisé useFetch qui prend une URL comme argument.
function useFetch(url) {
    // Initialisation de l'état pour les données, le chargement, et l'erreur.
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    // Lance une erreur spécifique si l'API ne fonctionne pas
                    throw new Error("L'API ne fonctionne pas");
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                // Capture les erreurs, y compris les erreurs réseau/API
                setError(error.message); // Utilise error.message pour afficher le message d'erreur personnalisé
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
