import React, { useEffect, useState } from 'react';
import Icone from '../Icone';
import { useParams } from 'react-router-dom';
import useFetch from '../Hook';
import '../PersonnalChart/Persochart.css';

const Stats = () => {
    const { id } = useParams();
    const [calorieCount, setCalorieCount] = useState('');
    const [proteinCount, setProteinCount] = useState('');
    const [carbohydrateCount, setCarbohydrateCount] = useState('');
    const [lipidCount, setLipidCount] = useState('');
    // Appel de l'API
    const { data: userData, loading, error } = useFetch(`http://localhost:3000/user/${id}`);

    useEffect(() => {
        if (userData && userData.data && userData.data.keyData) {
            const { keyData } = userData.data;
            // Mise à jour des états avec les nouvelles valeurs
            if (keyData.calorieCount) setCalorieCount(keyData.calorieCount);
            if (keyData.proteinCount) setProteinCount(keyData.proteinCount);
            if (keyData.carbohydrateCount) setCarbohydrateCount(keyData.carbohydrateCount);
            if (keyData.lipidCount) setLipidCount(keyData.lipidCount);
        }
    }, [userData]); // Dépendance à userData pour se déclencher à sa mise à jour

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;


    return (
        <>
            <div className='statPerso'>

                <div className='statKey'>
                    <Icone iconName="fire-flame-curved" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{calorieCount}Kcal</p>
                        <p className='textP'>Calories</p>
                    </div>
                </div>

                <div className='statKey'>
                    <Icone iconName="fish" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{proteinCount}g</p>
                        <p className='textP'>Proteines</p>
                    </div>
                </div>

                <div className='statKey'>
                    <Icone iconName="apple-whole" className='iconeKey' />
                    <div className='textKey'>
                        <p className='textDataKey'>{carbohydrateCount}g</p>
                        <p className='textP'>Glucides</p>
                    </div>
                </div>

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