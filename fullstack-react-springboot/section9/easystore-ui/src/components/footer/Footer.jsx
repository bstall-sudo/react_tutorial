import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTags } from "@fortawesome/free-solid-svg-icons";

/* target="_blank" lets the link open in a new windwo
 rel= "noreferrer is to make that opening in a new windwo safe
 arria-hidden = "true" makes the icon ignored by screen readers for blind people
 to import Footer in the App.jsx we don't need curly braces, as it is exported here
 as the default export.
 */

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 font-primary text-gray-700 dark:text-gray-300">
      Built with
      <FontAwesomeIcon
        icon={faHeart}
        className="text-red-600 mx-1 animate-puls"
        aria-hidden="true"
      />
      by
      <a
        href="https://eazybytes.com/"
        target="_blank"
        rel="noreferrer"
        className="text-primary dark:text-light font-semibold px-1 transition-colors duration-300 hover:text-dark dark:hover:text-lighter"
      >
        eazybytes
      </a>
    </footer>
  );
}
