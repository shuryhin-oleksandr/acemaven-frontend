import React from "react";
import { ActivateContainer, ActivateInner, EndButton, EndText } from "./activate-end-styles";


const ActivateEnd:React.FC = () => {
    return (
        <ActivateContainer>
            <ActivateInner>
                <EndText>You have completed all fields. <br/>Thank you!</EndText>
                <a style={{textDecoration: "none"}} href='/'><EndButton>GOT IT!</EndButton></a>
            </ActivateInner>
        </ActivateContainer>
    )
}


export default ActivateEnd