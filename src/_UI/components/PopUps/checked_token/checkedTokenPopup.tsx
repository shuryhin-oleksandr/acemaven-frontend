import React from "react";
import {ButtonWrap, Container, Content, Message} from "./checked-token-popup-styles";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CheckedTokenPopup = () => {
  const {t} = useTranslation();
    return (
        <Container>
            <Content>
                <Message>{t("Error message/There is no account corresponding to this link.")}</Message>
                <NavLink to='/'><ButtonWrap style={{textTransform: "uppercase"}}>{t("Add bank account/Got it!")}</ButtonWrap></NavLink>
            </Content>
        </Container>
    )
}

export default CheckedTokenPopup