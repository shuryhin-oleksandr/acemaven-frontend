import * as React from "react";
import {useEffect} from "react";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import { getAuthUserInfo } from "../../../_BLL/thunks/profile/profileThunks";

//styles
import {HeaderContainer, InfoWrap, LogoWrap, PhotoWrap} from "./header-styles";
//icons
import user from '../../../_UI/assets/icons/profile/miniDEfaultPhoto.svg'
import logotype from "../../assets/icons/landing/inline_logo.svg";



const HeaderWithoutActions:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAuthUserInfo())
    }, [dispatch])

    let profilePhoto = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)

    return (
        <HeaderContainer>
            <LogoWrap>
                <img  src={logotype} alt=""/>
            </LogoWrap>
            <InfoWrap>
                    <PhotoWrap><img style={{objectFit:"cover"}} src={profilePhoto ? profilePhoto : user} alt=""/></PhotoWrap>
                </InfoWrap>

        </HeaderContainer>
    )
}

export default HeaderWithoutActions