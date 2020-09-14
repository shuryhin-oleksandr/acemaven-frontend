import * as React from 'react'
import Layout from "../../BaseLayout/Layout";
import AddNewUser from "./AddNewUser";
import CancelPopup from "../../PopUps/Cancel/CancelPopup";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    return (
        <>
            <CancelPopup/>
            <Layout>
                <AddNewUser />
            </Layout>
        </>

    )
}

export default AddNewUserContainer