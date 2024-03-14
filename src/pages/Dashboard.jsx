import { getDataForPersoChart } from '../utils/PersonalModel';
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
    const { loading, error, dynamicData } = getDataForPersoChart()

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;

    let firstName = dynamicData.userInfos.firstName

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
