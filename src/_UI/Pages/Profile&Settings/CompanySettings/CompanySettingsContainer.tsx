import React from "react";
import Layout from "../../../components/BaseLayout/Layout";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import CompanySettingsPage from "./CompanySettingsPage";

const CompanySettingsContainer:React.FC = () => {
    let isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    return (
        <Layout isAuth={isAuth}>
            <CompanySettingsPage />
        </Layout>
    )
}

export default CompanySettingsContainer