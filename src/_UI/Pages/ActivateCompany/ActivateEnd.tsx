import React from "react";
import { ActivateContainer, ActivateInner, EndButton, EndText } from "./activate-end-styles";
import {NavLink} from "react-router-dom";


const ActivateEnd:React.FC = () => {
    return (
        <ActivateContainer>
            <ActivateInner>
                <EndText>You have completed all fields. <br/>Thank you!</EndText>
                <NavLink style={{textDecoration: "none"}} to='/'><EndButton>GOT IT!</EndButton></NavLink>
            </ActivateInner>
        </ActivateContainer>
    )
}


export default ActivateEnd