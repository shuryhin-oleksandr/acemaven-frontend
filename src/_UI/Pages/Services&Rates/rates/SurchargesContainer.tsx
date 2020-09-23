import React, { useState } from "react";
import Layout from "src/_UI/components/BaseLayout/Layout";

import RegistrationNewForm from "./SurchargeRegistrationForm/RegistrationNewForm";
import SurchargePopup from "src/_UI/components/PopUps/Surcharge/SurchargePopup";


const SurchargesContainer:React.FC = () => {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {isOpen && <SurchargePopup setIsOpen={setIsOpen}/>}
            <Layout >
                <RegistrationNewForm />
            </Layout>
        </>

    )
}

export default SurchargesContainer