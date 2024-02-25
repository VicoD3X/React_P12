// Icone.jsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

// Ajoute les icônes FontAwesome solides à la bibliothèque pour une utilisation facile dans toute l'application.
library.add(fas);

// Définition du composant Icone
const Icone = ({ iconName, size = '2x', className }) => {
  return <FontAwesomeIcon icon={['fas', iconName]} size={size} className={className} />;
  // `iconName` définit le nom de l'icône spécifique à afficher.
  // `size` définit la taille de l'icône, avec une valeur par défaut de '2x' si aucune taille n'est spécifiée.
  // `className` permet de passer des classes CSS supplémentaires pour personnaliser l'icône.
};

export default Icone;
