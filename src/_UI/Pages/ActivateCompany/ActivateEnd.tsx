import React from "react";
import { ActivateContainer, ActivateInner, EndButton, EndText } from "./activate-end-styles";
import {NavLink} from "react-router-dom";


const ActivateEnd:React.FC = () => {
    return (
        <ActivateContainer>
            <ActivateInner>
                <EndText>New company was registered. Thank You!</EndText>
                <NavLink style={{textDecoration: "none"}} to='/settings/profile'><EndButton>GOT IT!</EndButton></NavLink>
            </ActivateInner>
        </ActivateContainer>
    )
}


export default ActivateEnd