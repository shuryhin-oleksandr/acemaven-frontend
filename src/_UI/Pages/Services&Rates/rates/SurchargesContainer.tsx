import React, { useState } from "react";
import Layout from "src/_UI/components/BaseLayout/Layout";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import RegistrationNewForm from "./SurchargeRegistrationForm/RegistrationNewForm";
import SurchargePopup from "src/_UI/components/PopUps/Surcharge/SurchargePopup";


const SurchargesContainer:React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {isOpen && <SurchargePopup setIsOpen={setIsOpen}/>}
            <Layout isAuth={isAuth}>
                <RegistrationNewForm />
            </Layout>
        </>

    )
}

export default SurchargesContainer