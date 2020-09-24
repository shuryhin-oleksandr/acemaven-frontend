import React from "react";
import {ButtonWrap, Container, TextWrap} from "./sign-up-finish-styles";
import {NavLink} from "react-router-dom";


const SignUpFinishPopup:React.FC = () => {
    return (
        <Container>
            <TextWrap>We will call your contact person soon.</TextWrap>
            <NavLink to='/' style={{textDecoration: "none"}}><ButtonWrap>GOT IT!</ButtonWrap></NavLink>
        </Container>
    )
}

export default SignUpFinishPopup