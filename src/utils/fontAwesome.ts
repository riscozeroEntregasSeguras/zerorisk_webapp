import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// Only import needed icons
// Keeps bundle size to the minimum
import {
  faTimes,
  faCheck,
  // TO REFACTOR
  faHome,
  faCar,
  faHospital,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';

// Register font awesome icons
library.add(
  faTimes,
  faCheck,
  faHome,
  faCar,
  faHospital,
  faPlane,
);

export default FontAwesomeIcon;
