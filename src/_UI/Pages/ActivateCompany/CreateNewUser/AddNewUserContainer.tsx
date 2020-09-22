import * as React from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import Spinner from "../../../components/_commonComponents/spinner/Spinner";
import {getAuthUserInfo, getEmployees} from "../../../../_BLL/reducers/authReducer";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)
    const employeesList = useSelector((state: AppStateType) => state.auth.employees)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthUserInfo())
        dispatch(getEmployees())
    }, [dispatch])

    return (
        <Outer>
            {isFetching && <Spinner />}
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <Layout isAuth={isAuth}>
                <AddNewUser list={employeesList} setIsOpen={setIsOpen}/>
            </Layout>
        </Outer>

    )
}

export default AddNewUserContainer

const Outer = styled.div`
width: 100%;
height: 100%;
`