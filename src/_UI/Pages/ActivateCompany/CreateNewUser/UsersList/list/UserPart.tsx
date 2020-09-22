import React, {useCallback} from "react";
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
import {IAddNewUserData} from "../../../../../../_BLL/types/addNewUserTypes";
import {deleteEmployee} from "../../../../../../_BLL/reducers/authReducer";
import {useDispatch} from "react-redux";
const deleteIcon = require('../../../../../assets/icons/delete.svg') as string
const user = require('../../../../../assets/icons/profile/defaultUserPhoto.svg') as string


type PropsType = {
    roles?: string[],
    max_width?: string,
    cardsMode : boolean,
    setEditMode? : VoidFunctionType,
    u?: IAddNewUserData
}

const UserPart:React.FC<PropsType> = ({max_width, cardsMode,
                                          setEditMode, u}) => {

    const dispatch = useDispatch()
    const deleteHandler = useCallback((id: number) => {
       dispatch(deleteEmployee(id))
    }, [dispatch])

    return (
        <Container max_width={max_width}>
            <Inner>
                <PhotoWrap><img src={u && u.photo ? u.photo : user} alt=""/></PhotoWrap>
                <InfoWrap>
                    <ActionWrap>
                        <Name>{u?.first_name + ' ' + u?.last_name}</Name>
                        <div>
                            <DeleteButton onClick={() => deleteHandler(u?.id as number)}><img src={deleteIcon} alt=""/></DeleteButton>
                            {cardsMode && <EditButton onClick={() => setEditMode && setEditMode(true)}><img src={editIcon} alt=""/></EditButton>}
                        </div>
                    </ActionWrap>
                    <Role>Roles: {u?.roles?.map(r => <SpanName key={r} role={r}>{r}</SpanName>)}</Role>
                    <Email>Email: <SpanEmail>{u?.email}</SpanEmail></Email>
                </InfoWrap>
            </Inner>
        </Container>
    )
}


export default UserPart

