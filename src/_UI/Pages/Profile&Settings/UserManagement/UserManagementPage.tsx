import React from "react";
import {CardsOuter, ManagementContainer, ManagementInner, ManagTitle } from "./user-management-styles";
import AddNewButton from "../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import { useState } from "react";
import UserPart from "../../ActivateCompany/CreateNewUser/UsersList/list/UserPart";
import EditUserCardForm from "./editUserCardForm/EditUserCardForm";
import AddUserForm from "./AddUserForm/AddUserForm";

const UserManagementPage:React.FC = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [editMode, setEditMode] = useState(false)
    let cardsMode = true;

    return (
        <ManagementContainer>
            <ManagementInner>
                <ManagTitle>
                    User Management
                </ManagTitle>
                {!isAdd
                    ? <div style={{maxWidth: '447px', width: '100%'}}><AddNewButton setIsAdd={setIsAdd}/></div>
                    : <AddUserForm setIsAdd={setIsAdd}/>
                }
                <CardsOuter>
                    {!editMode
                        ? <UserPart setEditMode={setEditMode} cardsMode={cardsMode} max_width='447px'/>
                        : <EditUserCardForm setEditMode={setEditMode}/>
                    }
                </CardsOuter>
            </ManagementInner>
        </ManagementContainer>
    )
}

export default UserManagementPage