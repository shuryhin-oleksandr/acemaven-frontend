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
import {useTranslation} from "react-i18next";


type PropsType = {
    setIsOpen: (value: boolean) => void;
    list?: Array<IAddNewUserData> | null,
    server_error?: AddUserError | null,
    company_type?: string,
    my_id: number,
    my_roles: string[]
}

const AddNewUser:React.FC<PropsType> = ({setIsOpen, list, server_error, company_type, my_id, my_roles}) => {
  const {t} = useTranslation();
    return (
        <AddContainer>
            <ContentWrap>
                <AddUserForm errorEmployee={server_error}/>
                <UsersList usersList={list}
                           my_id={my_id}
                           my_roles={my_roles}
                />
            </ContentWrap>
            <LineWrap />
            <NavigationWrap>
                <CancelButton onClick={() => setIsOpen(true)}>{t("Bookings/CANCEL")}</CancelButton>
                <NavLink style={{textDecoration: "none"}} to={(company_type === AppCompaniesTypes.AGENT) ? '/create/bank' : '/create/finish'}>
                    <BaseNextButton>{t("Booking process/NEXT")}</BaseNextButton>
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