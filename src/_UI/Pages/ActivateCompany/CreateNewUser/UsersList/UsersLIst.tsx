import React from "react";
import {ListContainer, ListInner} from "./users-list-styles";
import UserPart from "./list/UserPart";
import EmptyList from "./emptyList/EmptyList";
import {IAdditionalUser} from "../../../../../_BLL/types/addNewUserTypes";

type PropsType = {
    usersList?: Array<IAdditionalUser> | null
}

const UsersList:React.FC<PropsType> = ({usersList}) => {
    let cardsMode= false
    return (
        <ListContainer>
            <ListInner>
                {usersList
                    ? <UserPart cardsMode={cardsMode}/>
                    : <EmptyList text='new user'/>
                }
            </ListInner>
        </ListContainer>
    )
}


export default UsersList