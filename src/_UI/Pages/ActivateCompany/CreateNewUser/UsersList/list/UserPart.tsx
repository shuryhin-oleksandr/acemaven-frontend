import React from "react";
import {
    ActionWrap,
    Container,
    DeleteButton,
    EditButton,
    Email,
    InfoWrap,
    Inner,
    Name,
    PhotoWrap,
    Role,
    SpanEmail,
    SpanName
} from "./user-part-styles";
import editIcon from '../../../../../../_UI/assets/icons/profile/editCard.svg'
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
const deleteIcon = require('../../../../../assets/icons/delete.svg') as string
const user = require('../../../../../assets/icons/user.png') as string


type PropsType = {
    roles?: string[],
    max_width?: string,
    cardsMode : boolean,
    setEditMode? : VoidFunctionType
}

const UserPart:React.FC<PropsType> = ({max_width, cardsMode, setEditMode}) => {
    return (
        <Container max_width={max_width}>
            <Inner>
                <PhotoWrap><img src={user} alt=""/></PhotoWrap>
                <InfoWrap>
                    <ActionWrap>
                        <Name>Hanna Yarash</Name>
                        <div>
                            <DeleteButton><img src={deleteIcon} alt=""/></DeleteButton>
                            {cardsMode && <EditButton onClick={() => setEditMode && setEditMode(true)}><img src={editIcon} alt=""/></EditButton>}
                        </div>
                    </ActionWrap>
                    <Role>Roles: <SpanName>Billing</SpanName></Role>
                    <Email>Email: <SpanEmail>email@email.co</SpanEmail></Email>
                </InfoWrap>
            </Inner>
        </Container>
    )
}


export default UserPart

