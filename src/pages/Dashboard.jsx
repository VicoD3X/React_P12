import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../components/Hook';
import '../App.css';
import logo from '../pics/logo.png';
import Stats from '../components/Stats';
import Personnalchart from '../components/PersonnalChart/Persochart'
import Icone from '../components/Icone';

function Dashboard() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');

    // Appel de l'API
    const { data: userData, loading, error } = useFetch(`http://localhost:3000/user/${id}`);

    useEffect(() => {
        // Ajustez ici pour accéder correctement à firstName
        if (userData && userData.data && userData.data.userInfos && userData.data.userInfos.firstName) {
            setFirstName(userData.data.userInfos.firstName);
        }
    }, [userData]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;
    return (
        <>
            <div className='navH'>
                <img src={logo} alt='logo' className='logo'></img>
                <h3 className='navTitle'>Accueil</h3>
                <h3 className='navTitle'>Profil</h3>
                <h3 className='navTitle'>Réglage</h3>
                <h3 className='navTitle'>Communauté</h3>
            </div>
            <div className='mainContainer'>
                <div className="navV">
                    <div className='iconContain'>
                        {/* Utilisez le composant Icone avec différentes icônes */}
                        <Icone iconName="spa" className='iconeWeb' />
                        <Icone iconName="swimmer" className='iconeWeb' />
                        <Icone iconName="bicycle" className='iconeWeb' />
                        <Icone iconName="dumbbell" className='iconeWeb' />
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
