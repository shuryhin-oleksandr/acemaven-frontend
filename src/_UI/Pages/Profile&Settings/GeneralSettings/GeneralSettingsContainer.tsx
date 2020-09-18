import React from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import GeneralSettingsPage from './GeneralSettingsPage';

const GeneralSettingsContainer = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    return (
        <Layout isAuth={isAuth}>
            <GeneralSettingsPage/>
        </Layout>
    )
}

export default GeneralSettingsContainer