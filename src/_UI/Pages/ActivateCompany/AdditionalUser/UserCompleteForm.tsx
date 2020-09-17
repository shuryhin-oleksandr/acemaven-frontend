import React from 'react'
import {FillOuter, FormContainer, FullfilledWrap, Label, LineWrap, TextWrap } from './additional-user-styles'


const UserCompleteForm:React.FC = () => {
    return (
        <FormContainer>
            <FullfilledWrap>
                <FillOuter>
                    <Label>Email</Label>
                    <TextWrap>blabla@blatrteerterertertt</TextWrap>
                </FillOuter>
                <FillOuter>
                    <Label>Roles</Label>
                    <TextWrap>fdf, 454</TextWrap>
                </FillOuter>
            </FullfilledWrap>
            <LineWrap/>
        </FormContainer>
    )
}

export default UserCompleteForm
