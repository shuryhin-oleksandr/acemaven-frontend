import React, {useState} from 'react'
import Layout from "../../../../_UI/components/BaseLayout/Layout";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import AddNewBank from "./AddNewBank";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import styled from 'styled-components';


const AddBankAccountContainer:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)
    return (
        <Outer>
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <Layout isAuth={isAuth}>
                <AddNewBank setIsOpen={setIsOpen}/>
            </Layout>
        </Outer>

    )
}

export default AddBankAccountContainer

const Outer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
`