import React, {useEffect} from "react";
import Layout from "../../../components/BaseLayout/Layout";
import CompanySettingsPage from "./CompanySettingsPage";
import {useDispatch} from "react-redux";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";


const CompanySettingsContainer:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/company'))

    }, [dispatch])

    return (
        <Layout >
            <CompanySettingsPage />
        </Layout>
    )
}

export default CompanySettingsContainer