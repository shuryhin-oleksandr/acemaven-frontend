import * as React from "react";
import {ButtonWrap, HeaderContainer,  LogoWrap, PhotoWrap} from "./header-styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import styled from "styled-components";
import {useEffect} from "react";
import {getAuthUserInfo} from "../../../_BLL/reducers/profileReducer";
const notification = require('../../../_UI/assets/icons/clarity_notification-solid-badged.svg') as string;
const card = require('../../../_UI/assets/icons/card.svg') as string;
const user = require('../../../_UI/assets/icons/profile/defaultUserPhoto.svg')



const Header:React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
       localStorage.getItem('access_token') && dispatch(getAuthUserInfo())
    }, [])

    let profilePhoto = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)

    return (
        <HeaderContainer>
            <LogoWrap>ACEMAVEN</LogoWrap>
             <Info>
                <ButtonWrap><img src={card} alt=""/></ButtonWrap>
                <ButtonWrap><img src={notification} alt=""/></ButtonWrap>
                <PhotoWrap><img src={profilePhoto? profilePhoto : user} alt=""/></PhotoWrap>
            </Info>

        </HeaderContainer>
    )
}

export default Header

const Info = styled.div`
  max-width: 115px;
  width: 100%;
  display: flex;
justify-content: space-between;
`