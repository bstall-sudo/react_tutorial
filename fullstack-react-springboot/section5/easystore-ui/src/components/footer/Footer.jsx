import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTags } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

/* target="_blank" lets the link open in a new windwo
 rel= "noreferrer is to make that opening in a new windwo safe
 arria-hidden = "true" makes the icon ignored by screen readers for blind people
 to import Footer in the App.jsx we don't need curly braces, as it is exported here
 as the default export.
 */

export default function Footer(){
    return (
        <footer className="footer">
            Built with
            <FontAwesomeIcon 
            icon={faHeart}
            className="footer-icon"
            aria-hidden= "true"
            />
            by 
            <a href="https://eazybytes.com/" target="_blank" rel= "noreferrer"> 
                eazybytes
            </a>

        </footer>

    );
}