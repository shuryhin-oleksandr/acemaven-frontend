import React from 'react';
import {FooterContacts, FooterContainer, FooterInner, FooterLogo} from "./footer-styles";
import footer_logo from '../../../../../_UI/assets/icons/landing/white_logo.svg'

const Footer:React.FC = () => {
    return (
        <FooterContainer>
            <FooterInner>
                <FooterLogo><img src={footer_logo} alt=""/></FooterLogo>
                <FooterContacts>Ernesto Contacts</FooterContacts>
            </FooterInner>
        </FooterContainer>
    )
}

export default Footer