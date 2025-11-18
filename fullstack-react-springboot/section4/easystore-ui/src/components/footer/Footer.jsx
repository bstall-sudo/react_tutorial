import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTags } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";
import styles from "./footer.module.css"
import styled from "styled-components"; /* with styled, we can can create styled components*/
import EazyButton from "../eazyButton"; /* this imports the styled button from the eazyButton.js*/



const H1 = styled.h1`
    color: #5B21B6;
    text-align : center;
    background-color : yellow;
`;
/* target="_blank" lets the link open in a new windwo
 rel= "noreferrer is to make that opening in a new windwo safe
 arria-hidden = "true" makes the icon ignored by screen readers for blind people
 to import Footer in the App.jsx we don't need curly braces, as it is exported here
 as the default export.
 */

 /* if wee used the footer.css and not the footer.module.css, this line would be:
            <footer className="footer">  
            
but using this approach, we can make sure, that the css documents don't overwrite each other*/
export default function Footer(){
    return (
        <>
            <H1>
                This is a text using the styled components!
            </H1>
            <EazyButton>Submit</EazyButton>
            <footer className={styles.footer}> 
                Built with
                <FontAwesomeIcon 
                icon={faHeart}
                className={styles["footer-icon"]}  /* if wee used the footer.css and not the footer.module.css, this line would be:
                className = "footer-icon" */
                aria-hidden= "true"
                />
                by 
                <a href="https://eazybytes.com/" target="_blank" rel= "noreferrer"> 
                    eazybytes
                </a>

            </footer>
        </>


    );
}