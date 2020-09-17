import React, {useState} from 'react'
import Layout from "../../../../_UI/components/BaseLayout/Layout";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import AddNewBank from "./AddNewBank";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";


const AddBankAccountContainer:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)
    return (
        <>
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <Layout isAuth={isAuth}>
                <AddNewBank setIsOpen={setIsOpen}/>
            </Layout>
        </>

    )
}

export default AddBankAccountContainer