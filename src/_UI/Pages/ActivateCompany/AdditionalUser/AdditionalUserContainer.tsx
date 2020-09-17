import React from 'react'
import {Inner, Title, Wrapper} from "./additional-user-styles";
import UserCompleteForm from './UserCompleteForm';

const AdditionalUserContainer:React.FC = () => {
    return (
        <Wrapper>
            <Inner>
                <Title>Complete Profile</Title>
                <UserCompleteForm />
            </Inner>
        </Wrapper>
    )
}

export default AdditionalUserContainer