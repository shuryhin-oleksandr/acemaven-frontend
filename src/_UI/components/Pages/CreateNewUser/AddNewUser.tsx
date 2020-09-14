import * as React from 'react'
import {AddContainer, CancelButton, ContentWrap, NavigationWrap} from './add-new-user-styles'
import AddUserForm from "../../Forms/AddUserForm";
import UsersList from "./UsersList/UsersLIst";
import BaseNextButton from "../../base/BaseNextButton";

interface IProps {

}

const AddNewUser:React.FC<IProps> = () => {
    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm />
                <UsersList/>
            </ContentWrap>
            <NavigationWrap>
                    <CancelButton>Cancel</CancelButton>
                    <BaseNextButton>Next</BaseNextButton>
            </NavigationWrap>
        </AddContainer>

    )
}

export default AddNewUser