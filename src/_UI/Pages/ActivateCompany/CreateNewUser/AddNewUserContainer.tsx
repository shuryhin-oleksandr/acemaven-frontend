import * as React from 'react'
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import { getEmployees} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import LayoutWithoutNav from "../../../components/BaseLayout/LayoutWithoutNav";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const employeesList = useSelector((state: AppStateType) => state.company.employees)
    const server_error = useSelector((state: AppStateType) => state.company.addingEmployeeError)

    const dispatch = useDispatch()

   /* const clearToken = () => {
        localStorage.removeItem('access_token')
    }*/
    useEffect(() => {
        dispatch(getEmployees())
        /*return () => {
            clearToken()
        }*/
    }, [dispatch])

    return (
        <Outer>
            {isOpen && <CancelPopup things={'users'} setIsOpen={setIsOpen}/>}
            <LayoutWithoutNav>
                <AddNewUser server_error={server_error} list={employeesList} setIsOpen={setIsOpen}/>
            </LayoutWithoutNav>
        </Outer>

    )
}

export default AddNewUserContainer

const Outer = styled.div`
width: 100%;
height: 100%;
`