import React, { useEffect, useState } from 'react';
import '../PersonnalChart/Persochart.css';
import Icone from '../../components/Icone'
import { getDataForPersoChart } from '../../utils/PersonalModel';


const Stats = () => {
    const { loading, error, dynamicData } = getDataForPersoChart()

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;

    let calorieCount = dynamicData.keyData.calorieCount
    let proteinCount = dynamicData.keyData.proteinCount
    let carbohydrateCount = dynamicData.keyData.carbohydrateCount
    let lipidCount = dynamicData.keyData.lipidCount

    // Affichage des statistiques nutritionnelles.
    return (
        <>
            <div className='statPerso'>
                {/* Affichage des calories avec une icône et les données. */}
                <div className='statKey'>
                {/* <img src={meditationIcon} alt="Flamme incurvée" className="iconeKey" /> */}
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