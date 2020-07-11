import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faSpinner,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faCodepen,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faBars,
  faCodepen,
  faGithub,
  faLinkedin,
  faMapMarkerAlt,
  faSpinner,
  faTimes,
  faTwitter
);

const FAIcon = (props) => <FontAwesomeIcon {...props} />;

export default FAIcon;
