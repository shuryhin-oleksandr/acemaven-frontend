import React, {useEffect} from "react";
import Layout from "../../../components/BaseLayout/Layout";
import CompanySettingsPage from "./CompanySettingsPage";
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
import {AppStateType} from "../../../../_BLL/store";


const CompanySettingsContainer:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/company'))
    }, [dispatch])

    const current_user = useSelector((state: AppStateType) => state.profile.authUserInfo)

    return (
        <Layout >
            <CompanySettingsPage company_type={current_user?.companies && current_user?.companies[0].type}/>
        </Layout>
    )
}

export default CompanySettingsContainer