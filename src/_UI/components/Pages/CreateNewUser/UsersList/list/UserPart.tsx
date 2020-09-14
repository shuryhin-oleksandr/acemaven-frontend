import React from "react";
import {ActionWrap, Container, DeleteButton, Email, InfoWrap, Inner, Name, PhotoWrap, Role} from "./user-part-styles";
const deleteIcon = require('../../../../../assets/icons/delete.svg') as string
const user = require('../../../../../assets/icons/user.png') as string

type PropsType = {
    roles?: string[]
}

const UserPart:React.FC<PropsType> = () => {
    return (
        <Container>
            <Inner>
                <PhotoWrap><img src={user} alt=""/></PhotoWrap>
                <InfoWrap>
                    <ActionWrap>
                        <Name>Hanna Yarash</Name>
                        <DeleteButton><img src={deleteIcon} alt=""/></DeleteButton>
                    </ActionWrap>
                    <Role>Roles: Billing</Role>
                    <Email>Email: email@email.co</Email>
                </InfoWrap>
            </Inner>
        </Container>
    )
}


export default UserPart

