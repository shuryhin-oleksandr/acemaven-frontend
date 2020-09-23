import * as React from "react";
import {ButtonWrap, HeaderContainer, InfoWrap, LogoWrap, PhotoWrap} from "./header-styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
const notification = require('../../../_UI/assets/icons/clarity_notification-solid-badged.svg') as string;
const card = require('../../../_UI/assets/icons/card.svg') as string;
const user = require('../../../_UI/assets/icons/profile/defaultUserPhoto.svg')



const Header:React.FC = () => {

    let profilePhoto = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)

    return (
        <HeaderContainer>
            <LogoWrap>ACEMAVEN</LogoWrap>
             <InfoWrap>
                <ButtonWrap><img src={card} alt=""/></ButtonWrap>
                <ButtonWrap><img src={notification} alt=""/></ButtonWrap>
                <PhotoWrap><img src={profilePhoto? profilePhoto : user} alt=""/></PhotoWrap>
            </InfoWrap>

        </HeaderContainer>
    )
}

export default Header