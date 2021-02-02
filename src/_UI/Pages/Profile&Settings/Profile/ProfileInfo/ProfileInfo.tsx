import React from 'react'
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
//styles
import {
    EditButton,
    HeaderWrap,
    PhotoWrap,
    ProfileContent,
    ProfileInner,
    ProfileTitle
} from "../profile-styles";
//components
import ProfileInfoField from "../../../../components/_commonComponents/ProfileinfoBlock/ProfileInfoField";
//icons
import editIcon from "../../../../assets/icons/profile/editProfile.svg";
import photo from "../../../../assets/icons/profile/border-radius.svg";


type PropsType = {
    setIsEdit: (value: boolean) => void,
    isEdit: boolean
}

const ProfileInfo: React.FC<PropsType> = ({setIsEdit, isEdit}) => {

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
                <PhotoWrap><img src={profilePhoto ? profilePhoto : photo} alt=""/></PhotoWrap>
                <ProfileInfoField/>
            </ProfileContent>
        </ProfileInner>
    )
}

export default ProfileInfo