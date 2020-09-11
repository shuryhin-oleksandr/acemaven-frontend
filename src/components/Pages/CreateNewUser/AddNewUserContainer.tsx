import * as React from 'react'
import Layout from "../../BaseLayout/Layout";
import AddNewUser from "./AddNewUser";

interface IProps {

}

const AddNewUserContainer:React.FC<IProps> = () => {
    return (
        <Layout>
            <AddNewUser />
        </Layout>
    )
}

export default AddNewUserContainer