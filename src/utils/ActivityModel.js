
import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataActivity from '../../public/dataActivity.json';


// Constante pour déterminer si l'API doit être utilisée ou non
const USEAPI = true;

// Fonction pour récupérer les données destinées au graphique d'activité
export function getDataForActivityChart() {
    // Utilisation du hook useParams pour récupérer l'ID de l'utilisateur depuis l'URL
    const { id } = useParams();

    // Déclaration initiale des variables pour les données dynamiques, le chargement et les erreurs
    let dynamicData, loading, error;

    // Condition pour choisir entre la récupération de données via API ou données locales
    if (USEAPI) {

        // Appel API avec useFetch pour obtenir les données, le statut de chargement et les erreurs
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/activity`));
    } else {

        // Recherche de l'activité utilisateur dans les données locales si l'API n'est pas utilisée
        const userActivity = dataActivity.USER_ACTIVITY.find(user => user.userId.toString() === id);

        // Gestion du cas où l'utilisateur ou ses sessions d'activité sont introuvables
        if (!userActivity || !userActivity.sessions) {
            return { error: true };
        }
        
        // Affectation des données de l'activité de l'utilisateur aux variables appropriées
        dynamicData = { data: userActivity };
        loading = false;
        error = false;
    }

    // Si les données sont encore en cours de chargement, retourner cet état
    if (loading) {
        return { loading };
    }

    // Si une erreur est survenue ou si les données sont incorrectes ou incomplètes, signaler une erreur
    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.sessions) {
        return { error: true };
    }

    // Traitement des données pour les adapter au format attendu par le graphique
    const dataForChart = dynamicData.data.sessions.map((session, index) => ({
        name: `Jour ${index + 1}`, // Nom de la session
        kg: session.kilogram, // Poids en kilogrammes
        Kcal: session.calories // Calories brûlées
    }));

    // Retourne les données finales, incluant les états de chargement et d'erreur, ainsi que les données pour le graphique
    return { loading, error, dataForChart };
}

