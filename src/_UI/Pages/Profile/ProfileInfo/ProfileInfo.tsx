import React from 'react'
import {
    EditButton,
    HeaderWrap,
    PhotoWrap,
    ProfileContent,
    ProfileInner,
    ProfileTitle
} from "../profile-styles";
import editIcon from "../../../assets/icons/profile/editProfile.svg";
import photo from "../../../assets/icons/profile/Rectangle.png";
import ProfileInfoField from "../../../components/_commonComponents/ProfileinfoBlock/ProfileInfoField";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";


type PropsType = {
    info1: any,
    info2: any,
    setIsEdit: VoidFunctionType,
    isEdit: boolean
}

const ProfileInfo:React.FC<PropsType> = ({info1, info2, setIsEdit, isEdit}) => {
    return (
        <ProfileInner>
        <HeaderWrap>
            <ProfileTitle>My Profile</ProfileTitle>
            <EditButton onClick={() => !isEdit ? setIsEdit(true) : setIsEdit(false)}>
                <img src={editIcon} alt=""/>
            </EditButton>
        </HeaderWrap>
            <ProfileContent>
                <PhotoWrap><img src={photo} alt=""/></PhotoWrap>
                <ProfileInfoField info1={info1} info2={info2}/>
            </ProfileContent>
        </ProfileInner>
    )
}

export default ProfileInfo