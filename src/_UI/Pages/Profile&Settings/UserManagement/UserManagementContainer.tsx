import React from 'react'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import Layout from "../../../components/BaseLayout/Layout";
import UserManagementPage from './UserManagementPage';


const UserManagementContainer = () => {
    let isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    return (
        <Layout isAuth={isAuth}>
            <UserManagementPage />
        </Layout>
    )
}

export default UserManagementContainer

