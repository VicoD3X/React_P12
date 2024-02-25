// Icone.jsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../App.css';


library.add(fas);
 // Ajoute les icônes FontAwesome solides à la bibliothèque pour une utilisation facile.


 // Composant Icone : affiche une icône FontAwesome, `iconName` et `size` sont paramétrables.
const Icone = ({ iconName, size = '2x', className}) => {
  return <FontAwesomeIcon icon={['fas', iconName]} size={size} className={className} />;
   // Utilise les props pour passer le type et le nom de l'icône ainsi que la taille à FontAwesomeIcon.
};

export default Icone;
