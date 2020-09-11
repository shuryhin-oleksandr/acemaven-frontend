import * as React from 'react'
import {AddContainer, ContentWrap, NavigationWrap} from './add-new-user-styles'
import AddUserForm from "../../Forms/AddUserForm";

interface IProps {

}

const AddNewUser:React.FC<IProps> = () => {
    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm />
            </ContentWrap>
            <NavigationWrap>

            </NavigationWrap>
        </AddContainer>

    )
}

export default AddNewUser