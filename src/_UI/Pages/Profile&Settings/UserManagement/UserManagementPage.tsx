import React, {useEffect} from "react";
import {CardsOuter, ManagementContainer, ManagementInner, ManagTitle } from "./user-management-styles";
import AddNewButton from "../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import { useState } from "react";
import UserPart from "../../ActivateCompany/CreateNewUser/UsersList/list/UserPart";
import EditUserCardForm from "./editUserCardForm/EditUserCardForm";
import AddUserForm from "./AddUserForm/AddUserForm";
import {IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {deleteWorker, profileActions} from "../../../../_BLL/reducers/profileReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";

type PropsType = {
    workersList?: Array<IAddNewUserData> | null,
    dispatch: VoidFunctionType,
    my_id?: number
}

const UserManagementPage:React.FC<PropsType> = ({workersList, dispatch, my_id}) => {
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
                {!isAdd
                    ? !editMode && <div style={{maxWidth: '447px', width: '100%'}}><AddNewButton setIsAdd={setIsAdd}/></div>
                    : <AddUserForm server_error={error} dispatch={dispatch} setIsAdd={setIsAdd}/>
                }
                <CardsOuter editMode={editMode}>
                    {/*{!editMode
                        ? workersList?.map(chargable_weight => <UserPart deleteUser={deleteUser} u={chargable_weight} setEditMode={setEditMode} cardsMode={cardsMode} max_width='447px'/>)
                        : <EditUserCardForm dispatch={dispatch} setEditMode={setEditMode}/>
                    }*/}
                    {workersList?.map(w => editedUserId !== w?.id
                        ? <UserPart my_id={my_id} key={w.id} deleteUser={deleteUser} u={w}
                                    setEditMode={editHandler} cardsMode={cardsMode} max_width='447px'
                        />
                        : <EditUserCardForm key={w.id} worker={w} dispatch={dispatch} setEditMode={editHandler}/>
                    )}
                </CardsOuter>
            </ManagementInner>
        </ManagementContainer>
    )
}

export default UserManagementPage