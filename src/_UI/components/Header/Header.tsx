import * as React from "react";
import {ButtonWrap, HeaderContainer, InfoWrap, LogoWrap, PhotoWrap} from "./header-styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
const notification = require('../../../_UI/assets/icons/clarity_notification-solid-badged.svg') as string;
const card = require('../../../_UI/assets/icons/card.svg') as string;
const user = require('../../../_UI/assets/icons/user.png')

interface IProps {

}

const Header:React.FC<IProps> = () => {
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)
    return (
        <HeaderContainer>
            <LogoWrap>ACEMAVEN</LogoWrap>
            {
                isAuth && <InfoWrap>
                <ButtonWrap><img src={card} alt=""/></ButtonWrap>
                <ButtonWrap><img src={notification} alt=""/></ButtonWrap>
                <PhotoWrap><img src={user} alt=""/></PhotoWrap>
            </InfoWrap>
            }
        </HeaderContainer>
    )
}

export default Header