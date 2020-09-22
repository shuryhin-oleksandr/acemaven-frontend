import * as React from 'react'
import {AddContainer, ContentWrap, NavigationWrap} from './add-new-user-styles'
import AddUserForm from "./AddUserForm";
import UsersList from "./UsersList/UsersLIst";
import BaseNextButton from "../../../components/base/BaseNextButton/index";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import CancelButton from "../../../components/_commonComponents/buttons/navFormButtons/CancelButton";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import {IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";


type PropsType = {
    setIsOpen: VoidFunctionType,
    list?: Array<IAddNewUserData>,

}

const AddNewUser:React.FC<PropsType> = ({setIsOpen, list}) => {
    const errorEmployee = useSelector((state: AppStateType) => state.auth.addingEmployeeError)

    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm errorEmployee={errorEmployee}/>
                <UsersList  usersList={list}/>
            </ContentWrap>
            <LineWrap />
            <NavigationWrap>
                    <CancelButton setIsOpen={setIsOpen} text='CANCEL'/>
                    <NavLink to='/create/bank'><BaseNextButton>NEXT</BaseNextButton></NavLink>
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