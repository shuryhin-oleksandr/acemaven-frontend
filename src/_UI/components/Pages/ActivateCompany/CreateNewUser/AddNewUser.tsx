import * as React from 'react'
import {AddContainer, ContentWrap, NavigationWrap} from './add-new-user-styles'
import AddUserForm from "../../../Forms/AddUserForm";
import UsersList from "./UsersList/UsersLIst";
import BaseNextButton from "../../../base/BaseNextButton/index";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import CancelButton from "../../../_commonComponents/buttons/navFormButtons/CancelButton";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

type PropsType = {
    setIsOpen: VoidFunctionType
}

const AddNewUser:React.FC<PropsType> = ({setIsOpen}) => {
    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm />
                <UsersList/>
            </ContentWrap>
            <LineWrap />
            <NavigationWrap>
                    <CancelButton setIsOpen={setIsOpen} text='Cancel'/>
                    <NavLink to='/create/bank'><BaseNextButton>Next</BaseNextButton></NavLink>
            </NavigationWrap>
        </AddContainer>

    )
}

export default AddNewUser

const LineWrap = styled.div`
background-color: #115B86;
height: 1px;
width: 100%;
`