import React from 'react'
import {
    EditButton,
    HeaderWrap,
    PhotoWrap,
    ProfileContent,
    ProfileInner,
    ProfileTitle
} from "../profile-styles";
import editIcon from "../../../../assets/icons/profile/editProfile.svg";
import photo from "../../../../assets/icons/profile/border-radius.svg";
import ProfileInfoField from "../../../../components/_commonComponents/ProfileinfoBlock/ProfileInfoField";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../../_BLL/store";



type PropsType = {
    setIsEdit: VoidFunctionType,
    isEdit: boolean
}

const ProfileInfo:React.FC<PropsType> = ({ setIsEdit, isEdit}) => {

    let profilePhoto = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)

    return (
        <ProfileInner>
        <HeaderWrap>
            <ProfileTitle>My Profile</ProfileTitle>
            <EditButton onClick={() => !isEdit ? setIsEdit(true) : setIsEdit(false)}>
                <img src={editIcon} alt=""/>
            </EditButton>
        </HeaderWrap>
            <ProfileContent>
                <PhotoWrap><img src={profilePhoto? profilePhoto : photo} alt=""/></PhotoWrap>
                <ProfileInfoField />
            </ProfileContent>
        </ProfileInner>
    )
}

export default ProfileInfo