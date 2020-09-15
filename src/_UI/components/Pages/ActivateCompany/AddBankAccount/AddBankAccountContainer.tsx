import React, {useState} from 'react'
import Layout from "../../../BaseLayout/Layout";
import CancelPopup from "../../../PopUps/Cancel/CancelPopup";
import AddNewBank from "./AddNewBank";


const AddBankAccountContainer:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <Layout>
                <AddNewBank setIsOpen={setIsOpen}/>
            </Layout>
        </>

    )
}

export default AddBankAccountContainer