import React, { useState } from "react";
import { ProfileOuter } from "./profile-styles";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import EditProfileFormContainer from "./editForm/EditProfileFormContainer";


type PropsType = {

}

const ProfilePage:React.FC<PropsType> = () => {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <ProfileOuter>
                {!isEdit
                    ? <ProfileInfo setIsEdit={setIsEdit} isEdit={isEdit}/>
                    : <EditProfileFormContainer isEdit={isEdit} setIsEdit={setIsEdit}/>
                }
        </ProfileOuter>
    )
}

export default ProfilePage