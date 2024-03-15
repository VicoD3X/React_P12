import { getDataForPersoChart } from '../utils/PersonalModel';
import '../App.css';
import logo from '../pics/logo.png';
import Stats from '../components/Stats';
import Personnalchart from '../components/PersonnalChart/Persochart'
import yoga from '../pics/yoga.svg'
import swim from '../pics/swimming.svg'
import bike from '../pics/cycling.svg'
import alter from '../pics/weight.svg'


function Dashboard() {

// Récupère les états de chargement et d'erreur, et les données 
const { loading, error, dynamicData } = getDataForPersoChart();

// Affiche un message pendant le chargement des données
if (loading) return <p>Chargement...</p>;

// Affiche un message en cas d'erreur de récupération des données
if (error) return <p>Une erreur s'est produite lors de la connexion à la base de données. Veuillez réessayer ultérieurement.</p>;

// Extrait le prénom de l'utilisateur des données dynamiques pour une utilisation ultérieure
let firstName = dynamicData.userInfos.firstName;


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
