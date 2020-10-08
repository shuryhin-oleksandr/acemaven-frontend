import * as React from "react";
import {HeaderContainer, InfoWrap, LogoWrap, PhotoWrap} from "./header-styles";
import {useEffect} from "react";
import {getAuthUserInfo} from "../../../_BLL/reducers/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import user from '../../../_UI/assets/icons/profile/miniDEfaultPhoto.svg'


const HeaderWithoutActions:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAuthUserInfo())
    }, [dispatch])

    let profilePhoto = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)

    return (
        <HeaderContainer>
            <LogoWrap>ACEMAVEN</LogoWrap>
            <InfoWrap>
                    <PhotoWrap><img src={profilePhoto ? profilePhoto : user} alt=""/></PhotoWrap>
                </InfoWrap>

        </HeaderContainer>
    )
}

export default HeaderWithoutActions