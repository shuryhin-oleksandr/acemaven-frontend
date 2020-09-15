import * as React from "react";
import {ButtonWrap, HeaderContainer, InfoWrap, LogoWrap, PhotoWrap} from "./header-styles";
const notification = require('../../../_UI/assets/icons/clarity_notification-solid-badged.svg') as string;
const card = require('../../../_UI/assets/icons/account.svg') as string;
const user = require('../../assets/icons/user.svg')

interface IProps {

}

const Header:React.FC<IProps> = () => {
    return (
        <HeaderContainer>
            <LogoWrap>ACEMAVEN</LogoWrap>
            <InfoWrap>
                <ButtonWrap><img src={card} alt=""/></ButtonWrap>
                <ButtonWrap><img src={notification} alt=""/></ButtonWrap>
                <PhotoWrap><img src={user} alt=""/></PhotoWrap>
            </InfoWrap>
        </HeaderContainer>
    )
}

export default Header