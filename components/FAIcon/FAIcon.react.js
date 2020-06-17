import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faCodepen,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faMapMarkerAlt,
  faSpinner,
  faGithub,
  faLinkedin,
  faCodepen,
  faTwitter
);

const FAIcon = (props) => <FontAwesomeIcon {...props} />;

export default FAIcon;
