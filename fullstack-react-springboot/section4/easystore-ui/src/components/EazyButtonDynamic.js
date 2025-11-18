import styled from "styled-components";

/* background-color: ${(props)=>(props.$primary ? "#5B21B6" : "#295191")};  this makes it dynamic, so
if primary is true, the button will be purple, otherwise, blue. */

const EazyButtonDynamic = styled.button`

    color: white;
    background-color: ${(props)=>(props.$primary ? "#5B21B6" : "#295191")}; 
    padding : 20px;
    border-radius : 10px;

    align-item: center;
    align-content:center;
    justify-content: center;

    &:hover {
    background-color: yellow;
    }

    &:focus {
    outline: 2px solid white;
    }

`;

export default EazyButtonDynamic;