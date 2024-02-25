import { useState, useEffect } from 'react';

// Définition du hook personnalisé useFetch qui prend une URL comme argument.
function useFetch(url) {
    // Initialisation de l'état pour stocker les données de la requête, 
    // l'état de chargement, 
    // et une éventuelle erreur.
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Le hook useEffect est utilisé pour effectuer l'opération de fetch lorsque le composant est monté ou lorsque l'URL change.
    useEffect(() => {
        // Définition de la fonction fetchData comme asynchrone pour utiliser await.
        const fetchData = async () => {
            try {
                // Tentative de récupération des données depuis l'URL fournie.
                const response = await fetch(url);
                // Vérification si la réponse est OK
                if (!response.ok) {
                    // Si ce n'est pas le cas, lance une exception
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Conversion de la réponse en JSON et mise à jour de l'état des données.
                const data = await response.json();
                setData(data);
            } catch (error) {
                // En cas d'erreur, mise à jour de l'état d'erreur avec l'erreur capturée.
                setError(error);
                console.log(error);
            } finally {
                // Mise à jour de l'état de chargement pour indiquer que la requête est terminée.
                setLoading(false);
                // Ce code s'exécute après `then` ou `catch`, peu importe le résultat
                // Par exemple, arrêter une animation de chargement
            }
        };

        fetchData();
    }, [url]); // Ce code est exécuté à chaque fois que l'URL change.

    // Retourne les états de data, loading, et error pour qu'ils puissent être utilisés par les composants
    return { data, loading, error };
}

export default useFetch;
