// usePersonalData.js
import { useParams } from 'react-router-dom';
import useFetch from '../components/Hook'; // Assurez-vous que le chemin d'accès est correct
import dataPerso from '../../public/dataPerso.json'; // Assurez-vous que le chemin d'accès est correct

// Constante pour choisir entre l'utilisation des données via API ou des données locales
const USEAPI = false;

// Fonction pour obtenir les données pour un graphique personnalisé
export function getDataForPersoChart() {
    
    // Récupération de l'ID de l'utilisateur depuis l'URL avec useParams
    const { id } = useParams();

    // Initialisation des variables pour les données, le chargement et les erreurs
    let dynamicData, loading, error;

    // Vérifie si les données doivent être récupérées via l'API
    if (USEAPI) {

        // Utilisation de useFetch pour récupérer les données de l'utilisateur spécifique
        ({ data: dynamicData, loading, error } = useFetch(`http://localhost:3000/user/${id}`));
        if (error) {
            // Gère l'état où l'API ne fonctionne pas
            return { error: "L'API ne fonctionne pas", loading: false };
        }

        // Une fois le chargement terminé, mise à jour des données dynamiques pour correspondre à la structure attendue
        if (!loading) {
            dynamicData = dynamicData.data;
        }
    } else {

        // Recherche de l'utilisateur dans les données locales si l'API n'est pas utilisée
        const userFound = dataPerso.USER_MAIN_DATA.find(user => user.id.toString() === id);

        // Si l'utilisateur n'est pas trouvé, mise à jour des états d'erreur et de chargement
        if (!userFound) {
            setError("User not found"); // Mise à jour de l'état d'erreur avec un message spécifique
            setLoading(false); // Indication que le chargement est terminé
            return; // Sortie anticipée de la fonction
        }

        // Si l'utilisateur est trouvé, mise à jour de dynamicData avec les données de l'utilisateur
        dynamicData = userFound;
    }

    // Après traitement, considération que le chargement est terminé et qu'il n'y a pas d'erreur
    loading = false;
    error = false;

    // Si les données sont encore en cours de chargement, retourne cet état
    if (loading) {
        return { loading };
    }

    // Si une erreur est survenue ou si les données dynamiques sont inexistantes, signaler une erreur
    if (error || !dynamicData) {
        return { error: true };
    }

    // Retourne les données, y compris les états de chargement et d'erreur, ainsi que les données dynamiques
    return { loading, error, dynamicData };
}
