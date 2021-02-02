import React, {useState} from 'react'
//components
import EditProfileForm, {PopupOuter} from "./EditProfileForm";
import ChangePasswordPage from "./ChangePasswordPage";


type PropsType = {
    isEdit: boolean,
    setIsEdit: (value: boolean) => void
}

const EditProfileFormContainer: React.FC<PropsType> = ({isEdit, setIsEdit}) => {
    const [isChangeMode, setChangeMode] = useState(false)

    return (
        <>
            {isChangeMode && <PopupOuter><ChangePasswordPage setChangeMode={setChangeMode}/> </PopupOuter>}
            <EditProfileForm isEdit={isEdit} setIsEdit={setIsEdit} setChangeMode={setChangeMode}
                             isChangeMode={isChangeMode}/>
        </>
    )
}

export default EditProfileFormContainer