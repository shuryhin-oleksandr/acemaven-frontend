import * as React from 'react'
import Layout from "../../../BaseLayout/Layout";
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../../PopUps/Cancel/CancelPopup";
import {useState} from "react";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {isOpen && <CancelPopup setIsOpen={setIsOpen}/>}
            <Layout>
                <AddNewUser setIsOpen={setIsOpen}/>
            </Layout>
        </>

    )
}

export default AddNewUserContainer