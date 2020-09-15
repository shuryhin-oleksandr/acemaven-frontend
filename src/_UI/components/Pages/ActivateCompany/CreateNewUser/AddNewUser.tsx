import * as React from 'react'
import {AddContainer, CancelButton, ContentWrap, NavigationWrap} from './add-new-user-styles'
import AddUserForm from "../../../Forms/AddUserForm";
import UsersList from "./UsersList/UsersLIst";
import BaseNextButton from "../../../base/BaseNextButton/index";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

type PropsType = {
    setIsOpen: VoidFunctionType
}

const AddNewUser:React.FC<PropsType> = ({setIsOpen}) => {
    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm />
                <UsersList/>
            </ContentWrap>
            <NavigationWrap>
                    <CancelButton onClick={() => setIsOpen(true)}>Cancel</CancelButton>
                    <BaseNextButton>Next</BaseNextButton>
            </NavigationWrap>
        </AddContainer>

    )
}

export default AddNewUser