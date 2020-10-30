import React, {useEffect, useState} from "react";
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
import {getColor} from "../../../../../../_BLL/helpers/colorWrapMaker";
import deleteIcon from '../../../../../assets/icons/delete.svg';
import user from '../../../../../assets/icons/profile/defaultUserPhoto.svg';



type PropsType = {
    roles?: string[],
    max_width?: string,
    cardsMode : boolean,
    setEditMode? : (id: number, value: boolean) => void
    u?: IAddNewUserData,
    deleteUser?: VoidFunctionType,
    my_id?: number
}


const UserPart:React.FC<PropsType> = ({max_width, cardsMode, deleteUser,
                                          setEditMode, u, my_id}) => {

    const [colorWrap, setColorWrap] = useState('')
    useEffect(() => {
        setColorWrap(getColor(u?.roles))
    }, [u])


    return (
        <Container max_width={max_width}>
            <Inner>
                <PhotoWrap colorette={colorWrap}>
                    {/*<MyImageComponent img_url={u && u.photo}/>*/}
                    <img src={u && u.photo ? u?.photo : user} alt={user}/>
                </PhotoWrap>
                <InfoWrap>
                    <ActionWrap>
                        <Name>{u?.first_name + ' ' + u?.last_name}</Name>
                        <div>
                            {my_id !== u?.id &&
                            <DeleteButton onClick={() => deleteUser && deleteUser(u?.id as number)}>
                                <img src={deleteIcon} alt=""/>
                            </DeleteButton>
                            }
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

