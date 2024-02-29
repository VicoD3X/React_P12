import React, { useEffect, useState } from 'react';
import Icone from '../Icone';
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../PersonnalChart/Persochart.css';
// import jsonData from '../../../public/dataPerso.json'

const Stats = () => {
    const { id } = useParams(); // Récupère l'identifiant de l'utilisateur depuis l'URL.

    // Déclaration des états pour stocker les counts nutritionnels.
    const [calorieCount, setCalorieCount] = useState('');
    const [proteinCount, setProteinCount] = useState('');
    const [carbohydrateCount, setCarbohydrateCount] = useState('');
    const [lipidCount, setLipidCount] = useState('');

    // Appel de l'API pour récupérer les données de l'utilisateur.
    const { data: userData, loading, error } = useFetch(`http://localhost:3000/user/${id}`);

    // Mise à jour des états avec les données récupérées dès qu'elles sont disponibles.
    useEffect(() => {
        if (userData && userData.data && userData.data.keyData) {
            const { keyData } = userData.data;
            // Mise à jour des états avec les nouvelles valeurs
            if (keyData.calorieCount) setCalorieCount(keyData.calorieCount);                // Mise à jour des calories
            if (keyData.proteinCount) setProteinCount(keyData.proteinCount);                // Mise à jour des protéines
            if (keyData.carbohydrateCount) setCarbohydrateCount(keyData.carbohydrateCount); // Mise à jour des glucides
            if (keyData.lipidCount) setLipidCount(keyData.lipidCount);                      // Mise à jour des lipides
        }
    }, [userData]); // Se déclenche lorsque userData est mis à jour

    // Gestion de l'affichage en cas de chargement ou d'erreur.
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;

    // Affichage des statistiques nutritionnelles.
    return (
        <>
            <div className='statPerso'>
                {/* Affichage des calories avec une icône et les données. */}
                <div className='statKey'>
                    <Icone iconName="fire-flame-curved" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{calorieCount}Kcal</p>
                        <p className='textP'>Calories</p>
                    </div>
                </div>

                {/* Affichage des protéines avec une icône et les données. */}
                <div className='statKey'>
                    <Icone iconName="fish" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{proteinCount}g</p>
                        <p className='textP'>Proteines</p>
                    </div>
                </div>

                {/* Affichage des glucides avec une icône et les données. */}
                <div className='statKey'>
                    <Icone iconName="apple-whole" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{carbohydrateCount}g</p>
                        <p className='textP'>Glucides</p>
                    </div>
                </div>

                {/* Affichage des lipides avec une icône et les données. */}
                <div className='statKey'>
                    <Icone iconName="burger" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{lipidCount}g</p>
                        <p className='textP'>Lipides</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Stats;