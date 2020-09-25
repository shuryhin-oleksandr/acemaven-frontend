import React from "react";
import {ButtonWrap, Container, Content, Message} from "./checked-token-popup-styles";
import {NavLink} from "react-router-dom";

const CheckedTokenPopup = () => {
    return (
        <Container>
            <Content>
                <Message>There is no account corresponding to this link.</Message>
                <NavLink to='/'><ButtonWrap>GOT IT!</ButtonWrap></NavLink>
            </Content>
        </Container>
    )
}

export default CheckedTokenPopup