import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataRadar from '../../public/dataRadar.json';

const USEAPI = true; // Ajustez cette valeur selon si vous souhaitez utiliser l'API ou les données locales

export function getDataForRadarChart() {
    const { id } = useParams();
    let dynamicData, loading, error; // Déclaration au niveau supérieur de la fonction

    if (USEAPI) {
        // Appel API avec useFetch, récupère les données de performance basées sur l'id utilisateur
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/performance`));
    } else {
        // Recherche dans les données locales pour trouver les performances de l'utilisateur
        const userPerfo = dataRadar.USER_PERFORMANCE.find(user => user.userId.toString() === id);
        if (!userPerfo || !userPerfo.data) {
            return { error: true }; // Retourne une erreur si aucune donnée de performance n'est trouvée
        }
        dynamicData = { data: userPerfo }; // Préparation des données pour le traitement
        loading = false; // Indique que le chargement est terminé puisque nous utilisons des données locales
        error = false; // Aucune erreur n'est présente
    }

    // Vérification du chargement ou des erreurs avant de poursuivre
    if (loading) { 
        return { loading };
    }

    if (error || !dynamicData || !dynamicData.data || !dynamicData.data.data) {
        return { error: true };
    }

    // Traitement des données pour le format attendu par le radar chart
    const { kind, data } = dynamicData.data;
    const radarData = data.map(perf => ({
        subject: kind[perf.kind.toString()], // Convertit les identifiants de 'kind' en noms de disciplines
        A: perf.value, // Valeur de performance pour chaque discipline
        fullMark: 200 // La valeur maximale pour le graphique radar
    }));

    return { loading, error, radarData };
}
