import React, {useEffect} from "react";
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
const deleteIcon = require('../../../../../assets/icons/delete.svg') as string
const user = require('../../../../../assets/icons/profile/defaultUserPhoto.svg') as string


type PropsType = {
    roles?: string[],
    max_width?: string,
    cardsMode : boolean,
    setEditMode? : (id: number, value: boolean) => void
    u?: IAddNewUserData,
    deleteUser?: VoidFunctionType,

}


const UserPart:React.FC<PropsType> = ({max_width, cardsMode, deleteUser,
                                          setEditMode, u}, colorWrap: string) => {

    let getColor = (array: any) => {
        if(array && array.length > 1) {
            return ''
        }
        switch(array && array[0]) {
            case 'master': {
                return '#000000'
                break
            }

            case 'agent' : {
                return '#115B86'
                break
            }

            case 'billing' : {
                return '#1AB8E6'
                break
            }
            default: return ''
        }
    }

    useEffect(() => {
        colorWrap = getColor(u?.roles)
    }, [u])


    return (
        <Container max_width={max_width}>
            <Inner>
                <PhotoWrap colorette={colorWrap}><img src={u && u.photo ? u?.photo : user} alt=""/></PhotoWrap>
                <InfoWrap>
                    <ActionWrap>
                        <Name>{u?.first_name + ' ' + u?.last_name}</Name>
                        <div>
                            <DeleteButton onClick={() => deleteUser && deleteUser(u?.id as number)}><img src={deleteIcon} alt=""/></DeleteButton>
                            {cardsMode && <EditButton onClick={() => setEditMode && setEditMode(Number(u?.id), true)}><img src={editIcon} alt=""/></EditButton>}
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

