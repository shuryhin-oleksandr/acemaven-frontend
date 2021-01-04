import * as React from 'react'
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import { getEmployees} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import {authActions} from "../../../../_BLL/reducers/authReducer";
import LayoutWithoutNav from "../../../components/BaseLayout/LayoutWithoutNav";
import ModalWindow from "../../../components/_commonComponents/ModalWindow/ModalWindow";



const AddNewUserContainer:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const employeesList = useSelector((state: AppStateType) => state.company.employees)
    const server_error = useSelector((state: AppStateType) => state.company.addingEmployeeError)
    const company = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies)
    const my_id = useSelector((state: AppStateType) => state.profile.authUserInfo?.id)
    const my_roles = useSelector((state: AppStateType) => state.profile.authUserInfo?.roles)


    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(authActions.setAuth(true))
        dispatch(getEmployees())
    }, [dispatch])

    return (
        <Outer>
            <ModalWindow isOpen={isOpen}>
                <CancelPopup things={'users'} setIsOpen={setIsOpen}/>
            </ModalWindow>
            <LayoutWithoutNav>
                <AddNewUser server_error={server_error}
                            list={employeesList ? employeesList : null}
                            setIsOpen={setIsOpen}
                            company_type={company && String(company[0].type)}
                            my_id={Number(my_id)}
                            my_roles={my_roles ? my_roles : []}
                />
            </LayoutWithoutNav>
        </Outer>
    )
}

export default AddNewUserContainer

const Outer = styled.div`
width: 100%;
height: 100%;
`