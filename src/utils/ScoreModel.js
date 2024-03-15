import useFetch from "../components/Hook";
import { useParams } from 'react-router-dom';
import dataScore from '../../public/dataPerso.json';

// Détermine si on utilise des données d'API ou locales
const USEAPI = true;


// Fonction pour obtenir les données pour le graphique de score
export function getDataForScoreChart() {

    // Utilise useParams pour extraire l'ID de l'utilisateur depuis l'URL
    const { id } = useParams();

    // Initialise les variables pour les données, le chargement et les erreurs
    let dynamicData, loading, error;

    if (USEAPI) {

        // Récupère les données de l'utilisateur via API si USEAPI est vrai
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}/`));
    } else {

        // Trouve les données de l'utilisateur dans une source locale si l'API n'est pas utilisée
        const userScoring = dataScore.USER_MAIN_DATA.find(user => user.id.toString() === id);

        // Vérifie l'existence du score ou du todayScore pour l'utilisateur
        if (!userScoring || (userScoring.score === undefined && userScoring.todayScore === undefined)) {
            return { error: true }; // Retourne une erreur si aucun score n'est trouvé
        }
        dynamicData = { data: userScoring }; // Prépare les données trouvées pour un traitement ultérieur
        loading = false; // Indique la fin du chargement
        error = false; // Indique l'absence d'erreurs
    }

    // Retourne l'état de chargement si les données sont encore en traitement
    if (loading) return { loading };
    
    // Vérifie l'absence d'erreurs et la présence des données nécessaires
    if (error || !dynamicData || !dynamicData.data) return { error: true };

    // Calcul du score, converti en pourcentage si nécessaire
    const score = dynamicData.data.todayScore !== undefined ? dynamicData.data.todayScore * 100 : dynamicData.data.score * 100;

    // Prépare les données pour le graphique radial avec le score en pourcentage
    const radialData = [{
        name: 'Score',
        score: score, // Le score est déjà converti en pourcentage
        fill: '#E60000', // Couleur de remplissage pour le graphique
    }];

    // Retourne les données finales incluant l'état de chargement, les erreurs, le score et les données pour le graphique radial
    return { loading, error, score, radialData };
}


