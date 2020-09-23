import React, { useState } from "react";
import { ProfileOuter } from "./profile-styles";
import EditProfileForm from "./editForm/EditProfileForm";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


type PropsType = {

}

const ProfilePage:React.FC<PropsType> = () => {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <ProfileOuter>
                {!isEdit
                    ? <ProfileInfo setIsEdit={setIsEdit} isEdit={isEdit}/>
                    : <EditProfileForm isEdit={isEdit} setIsEdit={setIsEdit}/>
                }
        </ProfileOuter>
    )
}

export default ProfilePage