import * as React from 'react'
import {AddContainer, CancelButton, ContentWrap, NavigationWrap} from './add-new-user-styles'
import AddUserForm from "./AddUserForm";
import UsersList from "./UsersList/UsersLIst";
import BaseNextButton from "../../../components/base/BaseNextButton/index";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";
import {AddUserError} from "../../../../_BLL/reducers/profileReducer";
import {AppCompaniesTypes} from "../../../../_BLL/types/commonTypes";


type PropsType = {
    setIsOpen: (value: boolean) => void;
    list?: Array<IAddNewUserData> | null,
    server_error?: AddUserError | null,
    company_type?: string
}

const AddNewUser:React.FC<PropsType> = ({setIsOpen, list, server_error, company_type}) => {

    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm errorEmployee={server_error}/>
                <UsersList usersList={list}/>
            </ContentWrap>
            <LineWrap />
            <NavigationWrap>
                <CancelButton onClick={() => setIsOpen(true)}>CANCEL</CancelButton>
                <NavLink style={{textDecoration: "none"}} to={(company_type === AppCompaniesTypes.AGENT) ? '/create/bank' : '/create/finish'}>
                    <BaseNextButton>NEXT</BaseNextButton>
                </NavLink>
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