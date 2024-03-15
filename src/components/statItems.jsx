// StatItem.jsx
import React from 'react';
import '../components/PersonnalChart/Persochart.css';

const StatItem = ({ icon, quantity, name }) => {
    return (
        <div className='statKey'>
            <img src={icon} alt={`${name}_icon`} />
            <div className='textKey'>
                <p className='textDataKey'>{quantity}</p>
                <p className='textP'>{name}</p>
            </div>
        </div>
    );
}

export default StatItem;
