// Stats.jsx
import React from 'react';
import '../PersonnalChart/Persochart.css';
import { getDataForPersoChart } from '../../utils/PersonalModel';
import StatItem from '../statItems'; // Assurez-vous que le chemin d'importation est correct
import calories_icon from '../../pics/calories_icon.svg';
import protein_icon from '../../pics/protein_icon.svg';
import carbs_icon from '../../pics/carbs_icon.svg';
import lipid_icon from '../../pics/fat_icon.svg';

const Stats = () => {
    const { loading, error, dynamicData } = getDataForPersoChart();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur s'est produite</p>;

    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = dynamicData.keyData;

    return (
        <div className='statPerso'>
            <StatItem icon={calories_icon} quantity={`${calorieCount}Kcal`} name="Calories" />
            <StatItem icon={protein_icon} quantity={`${proteinCount}g`} name="Proteines" />
            <StatItem icon={carbs_icon} quantity={`${carbohydrateCount}g`} name="Glucides" />
            <StatItem icon={lipid_icon} quantity={`${lipidCount}g`} name="Lipides" />
        </div>
    );
}

export default Stats;
