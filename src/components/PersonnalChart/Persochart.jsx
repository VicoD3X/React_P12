import React, { useEffect, useState } from 'react';
import '../PersonnalChart/Persochart.css';
import { getDataForPersoChart } from '../../utils/PersonalModel';
import calories_icon from '../../pics/calories_icon.svg'
import protein_icon from '../../pics/protein_icon.svg'
import carbs_icon from '../../pics/carbs_icon.svg'
import lipid_icon from '../../pics/fat_icon.svg'


const Stats = () => {
    
    // Récupère les états de chargement, d'erreur et les données personnalisées 
    const { loading, error, dynamicData } = getDataForPersoChart();

    // Affiche un message de chargement si les données sont encore en cours de récupération
    if (loading) return <p>Chargement...</p>;

    // Affiche un message d'erreur si un problème est survenu lors de la récupération des données
    if (error) return <p>Une erreur s'est produite</p>;

    // Extractions des différents compteurs de nutriments depuis les données récupérées
    let calorieCount = dynamicData.keyData.calorieCount; // Nombre de calories
    let proteinCount = dynamicData.keyData.proteinCount; // Quantité de protéines
    let carbohydrateCount = dynamicData.keyData.carbohydrateCount; // Quantité de glucides
    let lipidCount = dynamicData.keyData.lipidCount; // Quantité de lipides


    // Affichage des statistiques nutritionnelles.
    return (
        <>
            <div className='statPerso'>
                {/* Affichage des calories avec une icône et les données. */}
                <div className='statKey'>
                    <img src={calories_icon} alt="calories_icon" />
                    <div className='textKey'>
                        <p className='textDataKey'>{calorieCount}Kcal</p>
                        <p className='textP'>Calories</p>
                    </div>
                </div>

                {/* Affichage des protéines avec une icône et les données. */}
                <div className='statKey'>
                    <img src={protein_icon} alt="protein_icon" />
                    <div className='textKey'>
                        <p className='textDataKey'>{proteinCount}g</p>
                        <p className='textP'>Proteines</p>
                    </div>
                </div>

                {/* Affichage des glucides avec une icône et les données. */}
                <div className='statKey'>
                    <img src={carbs_icon} alt="carbs_icon" />
                    <div className='textKey'>
                        <p className='textDataKey'>{carbohydrateCount}g</p>
                        <p className='textP'>Glucides</p>
                    </div>
                </div>

                {/* Affichage des lipides avec une icône et les données. */}
                <div className='statKey'>
                    <img src={lipid_icon} alt="lipid_icon" />
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