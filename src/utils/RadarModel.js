import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataRadar from '../../public/dataRadar.json';

// Définir si on souhaite utiliser l'API ou les données locales
const USEAPI = false;

// Fonction pour récupérer les données pour le graphique radar
export function getDataForRadarChart() {

    // Récupère l'ID de l'utilisateur à partir de l'URL
    const { id } = useParams();

    // Initialise les variables pour les données dynamiques, l'état de chargement, et l'état d'erreur
    let dynamicData, loading, error;

    if (USEAPI) {

        // Si USEAPI est vrai, on fait un appel API pour obtenir les données de performance de l'utilisateur
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/performance`));
    } else {

        // Sinon, recherche des données de performance dans un ensemble de données local
        const userPerfo = dataRadar.USER_PERFORMANCE.find(user => user.userId.toString() === id);

        // Gestion d'erreur si aucune donnée de performance n'est trouvée
        if (!userPerfo || !userPerfo.data) {
            return { error: true };
        }
        
        // Préparation des données pour l'affichage et indication que le chargement est fini et sans erreur
        dynamicData = { data: userPerfo };
        loading = false;
        error = false;
    }

    // Retourne l'état de chargement si les données sont encore en cours de chargement
    if (loading) {
        return { loading };
    }

    // Gestion d'erreur si une erreur survient ou si les données sont invalides ou incomplètes
    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.data) {
        return { error: true };
    }

    // Préparation et structuration des données pour le graphique radar
    const { kind, data } = dynamicData.data;
    const radarData = data.map(perf => ({
        subject: kind[perf.kind.toString()], // Conversion des identifiants de catégorie en noms lisibles
        A: perf.value, // Valeur de performance
        fullMark: 200 // Valeur maximale sur le graphique pour référence
    }));

    // Retour des données prêtes pour le graphique radar, incluant les états de chargement et d'erreur
    return { loading, error, radarData };
}

