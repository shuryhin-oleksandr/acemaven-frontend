import React, {useEffect} from "react";
import Layout from "../../../components/BaseLayout/Layout";
import CompanySettingsPage from "./CompanySettingsPage";
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
import {AppStateType} from "../../../../_BLL/store";
import {getCompanyInfo} from "../../../../_BLL/reducers/profileReducer";



const CompanySettingsContainer:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/company'))
    }, [dispatch])

    const current_user = useSelector((state: AppStateType) => state.profile.authUserInfo)
    let isFetching = useSelector((state:AppStateType) => state.profile.isFetching)
    let company = current_user?.companies &&  current_user?.companies[0].id


    useEffect(() => {
        if(current_user) {
            dispatch(getCompanyInfo(company))
        }
    }, [current_user])

    return (
        <Layout>
                 <CompanySettingsPage company_type={current_user?.companies && current_user?.companies[0].type}
                                       current_user_role={current_user?.roles ? current_user.roles : []}
                                      isFetching={isFetching}
                />
        </Layout>
    )
}

export default CompanySettingsContainer