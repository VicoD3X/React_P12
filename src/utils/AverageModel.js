import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataAverage from '../../public/dataAverage.json';

// Constante pour activer ou non l'utilisation de l'API pour récupérer les données
const USEAPI = true;

// Fonction pour obtenir les données pour le graphique de moyenne des sessions
export function getDataForAverageChart() {

    // Récupération de l'ID de l'utilisateur depuis l'URL grâce au hook useParams
    const { id } = useParams();

    // Initialisation des variables pour les données dynamiques, le statut de chargement et les erreurs
    let dynamicData, loading, error;

    // Vérification si l'API doit être utilisée pour récupérer les données
    if (USEAPI) {

        // Récupération des données via une requête API avec useFetch
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/average-sessions`));
    } else {

        // Recherche dans les données locales si l'API n'est pas utilisée
        const userAverage = dataAverage.USER_AVERAGE_SESSIONS.find(user => user.userId.toString() === id);

        // Gestion de l'absence de données pour l'utilisateur ou de ses sessions
        if (!userAverage || !userAverage.sessions) {
            return { error: true };
        }

        // Affectation des données trouvées aux variables appropriées
        dynamicData = { data: userAverage };
        loading = false;
        error = false;
    }

    // Retourner l'état de chargement si les données sont encore en train d'être chargées
    if (loading) {
        return { loading };
    }

    // Retourner une erreur si une erreur est survenue ou si les données ne sont pas valides
    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return { error: true };
    }

    // Mapping des jours de la semaine à partir des indices des sessions
    const dayOfWeekMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    // Traitement des sessions pour associer chaque session à son jour de la semaine
    const data = dynamicData.data.sessions.map((session) => ({
        ...session, 
        day: dayOfWeekMap[(session.day - 1) % 7], // Attribution du jour de la semaine en fonction de l'indice
    }));

    // Retour des données finales incluant le statut de chargement, les erreurs et les données pour le graphique
    return { loading, error, data };
}
