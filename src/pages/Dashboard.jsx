import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../components/Hook';
import '../App.css';
import logo from '../pics/logo.png';
import Stats from '../components/Stats';
import Personnalchart from '../components/PersonnalChart/Persochart'
import yoga from '../pics/yoga.svg'
import swim from '../pics/swimming.svg'
import bike from '../pics/cycling.svg'
import alter from '../pics/weight.svg'

// Le composant Dashboard, utilisé pour afficher le tableau de bord de l'utilisateur.
function Dashboard() {
    // Récupère le paramètre 'id' depuis l'URL à l'aide du hook useParams.
    const { id } = useParams();
    // Déclare un état local pour stocker le prénom de l'utilisateur.
    const [firstName, setFirstName] = useState('');

    // Utilise le hook personnalisé useFetch pour charger les données de l'utilisateur depuis une API.
    const { data: userData, loading, error } = useFetch(`http://localhost:3000/user/${id}`);

    // useEffect se déclenche après chaque rendu et met à jour le prénom avec les données reçues de l'API.
    useEffect(() => {
        if (userData && userData.data && userData.data.userInfos && userData.data.userInfos.firstName) {
            setFirstName(userData.data.userInfos.firstName);
        }
    }, [userData]); // Se déclenche à chaque changement de userData.

    // Affiche un message d'erreur si une erreur survient lors du chargement des données.
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;
    return (
        <>
            {/* Barre de navigation horizontale */}
            <div className='navH'>
                <img src={logo} alt='logo' className='logo'></img>

                {/* Liens de navigation */}
                <h3 className='navTitle'>Accueil</h3>
                <h3 className='navTitle'>Profil</h3>
                <h3 className='navTitle'>Réglage</h3>
                <h3 className='navTitle'>Communauté</h3>
            </div>
            <div className='mainContainer'>

                {/* Barre de navigation verticale */}
                <div className="navV">
                    <div className='iconContain'>
                        {/* Icônes représentant différentes activités */}
                        <img src={yoga} alt="yoga" className='iconeWeb'/>
                        <img src={swim} alt="swim" className='iconeWeb'/>
                        <img src={bike} alt="bike" className='iconeWeb'/>
                        <img src={alter} alt="alter" className='iconeWeb'/>
                    </div>
                    <div className='copyright'>Copiryght, SportSee 2020</div>
                </div>

                <div className='superStatsContainer'>
                    <Personnalchart />
                    <div className='statsContainer'>
                        <h1 className='helloText'>Bonjour <span className="texteRouge">{firstName || 'Utilisateur'}</span></h1>
                        <h3 className='helloText2'>Félicitations ! Vous avez explosé vos objectifs hier </h3>
                        <Stats />
                    </div>
                </div>
            </div >
        </>
    );
}

export default Dashboard;
