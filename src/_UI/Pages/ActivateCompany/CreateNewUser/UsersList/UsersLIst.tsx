import React from "react";
import {ListContainer, ListInner} from "./users-list-styles";
import UserPart from "./list/UserPart";
import EmptyList from "./emptyList/EmptyList";
import { IAddNewUserData} from "../../../../../_BLL/types/addNewUserTypes";
import {useDispatch} from "react-redux";
import {deleteEmployee} from "../../../../../_BLL/reducers/employeesAndBanksReducer";


type PropsType = {
    usersList?: Array<IAddNewUserData> | null,
    my_id: number,
    my_roles: string[]
}

const UsersList:React.FC<PropsType> = ({usersList, my_id, my_roles}) => {
    let cardsMode = false

    const dispatch = useDispatch()
    const deleteUser = (id: number) => {
        dispatch(deleteEmployee(id))
    }

    return (
        <ListContainer>
            <ListInner>
                {usersList
                    ? usersList.map(u => <UserPart deleteUser={deleteUser}
                                                   key={u?.id}
                                                   u={u}
                                                   cardsMode={cardsMode}
                                                   my_id={my_id}
                                                   current_user_roles={my_roles}
                    />)
                    : <EmptyList text='new user'/>
                }
            </ListInner>
        </ListContainer>
    )
}


export default UsersList