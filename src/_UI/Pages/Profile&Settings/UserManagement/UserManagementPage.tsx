import React, {useEffect, useState} from "react";
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {deleteWorker, profileActions} from "../../../../_BLL/reducers/profileReducer";
//types
import {IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";
//components
import AddNewButton from "../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import UserPart from "../../ActivateCompany/CreateNewUser/UsersList/list/UserPart";
import EditUserCardForm from "./editUserCardForm/EditUserCardForm";
import AddUserForm from "./AddUserForm/AddUserForm";
//styles
import {CardsOuter, ManagementContainer, ManagementInner, ManagTitle } from "./user-management-styles";



type PropsType = {
    workersList?: Array<IAddNewUserData> | null,
    dispatch: any,
    my_id?: number,
    current_user_roles: string[]
}

const UserManagementPage:React.FC<PropsType> = ({workersList, dispatch, my_id, current_user_roles}) => {
    const [isAdd, setIsAdd] = useState(false)
    const [editMode, setEditMode] = useState(false)

    let [editedUserId, setEditedId] = useState(0)
    let success = useSelector((state: AppStateType) => state.profile.addUserSuccess)
    let error = useSelector((state: AppStateType) => state.profile.addUserError)

    let editHandler = (id: number, value: boolean) => {
        setEditedId(id)
        setEditMode(value)
    }

    let cardsMode = true;
    const deleteUser = (workerId: number) => {
        dispatch && dispatch(deleteWorker(workerId))
    }

    useEffect(() => {
        if(success) {
            setIsAdd((false))
            dispatch(profileActions.setAddingUserSuccess(false))
            dispatch(profileActions.setAddingUserError(null))
        }
    }, [success])

    return (
        <ManagementContainer>
            <ManagementInner>
                <ManagTitle>
                    User Management
                </ManagTitle>
                {current_user_roles.includes('master') &&
                    (!isAdd
                        ? !editMode && <div style={{maxWidth: '447px', width: '100%'}}><AddNewButton setIsAdd={setIsAdd}/></div>
                        : <AddUserForm server_error={error} dispatch={dispatch} setIsAdd={setIsAdd}/>
                    )
                }
                <CardsOuter editMode={editMode}>
                    {workersList?.map(w => editedUserId !== w?.id
                        ? <UserPart my_id={my_id} key={w.id}
                                    deleteUser={deleteUser}
                                    u={w}
                                    setEditMode={editHandler}
                                    cardsMode={cardsMode}
                                    max_width='447px'
                                    current_user_roles={current_user_roles ? current_user_roles : []}
                        />
                        : <EditUserCardForm key={w.id} worker={w} dispatch={dispatch} setEditMode={editHandler}/>
                    )}
                </CardsOuter>
            </ManagementInner>
        </ManagementContainer>
    )
}

export default UserManagementPage