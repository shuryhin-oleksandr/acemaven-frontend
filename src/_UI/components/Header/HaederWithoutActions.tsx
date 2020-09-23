import * as React from "react";
import {HeaderContainer, InfoWrap, LogoWrap, PhotoWrap} from "./header-styles";
const user = require('../../../_UI/assets/icons/user.png')


const HeaderWithoutActions:React.FC = () => {
    return (
        <HeaderContainer>
            <LogoWrap>ACEMAVEN</LogoWrap>
            <InfoWrap>
                    <PhotoWrap><img src={user} alt=""/></PhotoWrap>
                </InfoWrap>

        </HeaderContainer>
    )
}

export default HeaderWithoutActions