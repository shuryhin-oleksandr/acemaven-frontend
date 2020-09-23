import * as React from 'react'
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import Spinner from "../../../components/_commonComponents/spinner/Spinner";
import { getEmployees} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import LayoutWithoutNav from "../../../components/BaseLayout/LayoutWithoutNav";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const employeesList = useSelector((state: AppStateType) => state.company.employees)
    const isFetching = useSelector((state: AppStateType) => state.company.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    return (
        <Outer>
            {isFetching && <Spinner />}
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <LayoutWithoutNav>
                <AddNewUser list={employeesList} setIsOpen={setIsOpen}/>
            </LayoutWithoutNav>
        </Outer>

    )
}

export default AddNewUserContainer

const Outer = styled.div`
width: 100%;
height: 100%;
`