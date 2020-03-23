import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// Only import needed icons
// Keeps bundle size to the minimum
import {
  faHome,
  faCar,
  faHospital,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';

// Register font awesome icons
library.add(
  faHome,
  faCar,
  faHospital,
  faPlane,
);

export default FontAwesomeIcon;
