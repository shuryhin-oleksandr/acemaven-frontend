import * as React from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import {useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)

    return (
        <Outer>
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <Layout isAuth={isAuth}>
                <AddNewUser setIsOpen={setIsOpen}/>
            </Layout>
        </Outer>

    )
}

export default AddNewUserContainer

const Outer = styled.div`
width: 100%;
height: 100%;
`