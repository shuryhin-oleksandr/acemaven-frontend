import React, { useState } from "react";
import { ProfileOuter } from "./profile-styles";
import EditProfileForm from "./editForm/EditProfileForm";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const ProfilePage:React.FC = () => {

    const [isEdit, setIsEdit] = useState(false)

    let info1 = [
        {name: 'Name', value: 'Hanna'},
        {name: 'Last Name', value: 'Una'},
        {name: 'Position in the Company', value: 'PM'},
    ]
    let info2 = [
        {name: 'Phone Number', value: '+123456789'},
        {name: 'Email', value: 'Una@com.com'},
        {name: 'Roles', value: ['Billing, Agent']},
    ]

    return (
        <ProfileOuter>
                {!isEdit
                    ? <ProfileInfo info1={info1} info2={info2} setIsEdit={setIsEdit} isEdit={isEdit}/>
                    : <EditProfileForm isEdit={isEdit} setIsEdit={setIsEdit}/>
                }
        </ProfileOuter>
    )
}

export default ProfilePage