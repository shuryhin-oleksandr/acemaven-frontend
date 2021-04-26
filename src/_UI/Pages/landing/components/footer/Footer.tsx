import React from 'react';
import {FooterContacts, FooterContainer, FooterInner, FooterLogo} from "./footer-styles";
import footer_logo from '../../../../../_UI/assets/icons/landing/white_logo.svg'
import {useTranslation} from "react-i18next";

const Footer:React.FC = () => {
  const {t} = useTranslation();
    return (
        <FooterContainer>
            <FooterInner>
                <FooterLogo><img src={footer_logo} alt=""/></FooterLogo>
                <FooterContacts>{t("Landing Page/Ernesto Contacts")}</FooterContacts>
            </FooterInner>
        </FooterContainer>
    )
}

export default Footer