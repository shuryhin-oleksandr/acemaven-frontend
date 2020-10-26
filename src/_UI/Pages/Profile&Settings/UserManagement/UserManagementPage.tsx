import React from "react";
import {CardsOuter, ManagementContainer, ManagementInner, ManagTitle } from "./user-management-styles";
import AddNewButton from "../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import { useState } from "react";
import UserPart from "../../ActivateCompany/CreateNewUser/UsersList/list/UserPart";
import EditUserCardForm from "./editUserCardForm/EditUserCardForm";
import AddUserForm from "./AddUserForm/AddUserForm";
import {IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {deleteWorker} from "../../../../_BLL/reducers/profileReducer";

type PropsType = {
    workersList?: Array<IAddNewUserData> | null,
    dispatch?: VoidFunctionType
}

const UserManagementPage:React.FC<PropsType> = ({workersList, dispatch}) => {
    const [isAdd, setIsAdd] = useState(false)
    const [editMode, setEditMode] = useState(false)

    let [editedUserId, setEditedId] = useState(0)

    let editHandler = (id: number, value: boolean) => {
        setEditedId(id)
        setEditMode(value)
        console.log(editMode)
    }

    let cardsMode = true;
    const deleteUser = (workerId: number) => {
        dispatch && dispatch(deleteWorker(workerId))
    }

    return (
        <ManagementContainer>
            <ManagementInner>
                <ManagTitle>
                    User Management
                </ManagTitle>
                {!isAdd
                    ? !editMode && <div style={{maxWidth: '447px', width: '100%'}}><AddNewButton setIsAdd={setIsAdd}/></div>
                    : <AddUserForm dispatch={dispatch} setIsAdd={setIsAdd}/>
                }
                <CardsOuter>
                    {/*{!editMode
                        ? workersList?.map(chargable_weight => <UserPart deleteUser={deleteUser} u={chargable_weight} setEditMode={setEditMode} cardsMode={cardsMode} max_width='447px'/>)
                        : <EditUserCardForm dispatch={dispatch} setEditMode={setEditMode}/>
                    }*/}
                    {workersList?.map(w => editedUserId !== w?.id
                        ? <UserPart key={w.id} deleteUser={deleteUser} u={w} setEditMode={editHandler} cardsMode={cardsMode} max_width='447px'/>
                        : <EditUserCardForm key={w.id} worker={w} dispatch={dispatch} setEditMode={editHandler}/>
                    )}
                </CardsOuter>
            </ManagementInner>
        </ManagementContainer>
    )
}

export default UserManagementPage