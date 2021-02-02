import React, {useEffect} from "react";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
import {getCompanyInfo} from "../../../../_BLL/thunks/profile/profileThunks";
//components
import Layout from "../../../components/BaseLayout/Layout";
import CompanySettingsPage from "./CompanySettingsPage";



const CompanySettingsContainer:React.FC = () => {

    //data from store
    const current_user = useSelector((state: AppStateType) => state.profile.authUserInfo)
    let isFetching = useSelector((state:AppStateType) => state.profile.isFetching)
    let company = current_user?.companies &&  current_user?.companies[0].id
    let company_type = current_user?.companies &&  current_user?.companies[0].type


    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/company'))
    }, [dispatch])


    useEffect(() => {
        if(current_user) {
            dispatch(getCompanyInfo(Number(company)))
        }
    }, [current_user])

    return (
        <Layout>
                 <CompanySettingsPage company_type={String(company_type)}
                                       current_user_role={current_user?.roles ? current_user.roles : []}
                                      isFetching={isFetching}
                />
        </Layout>
    )
}

export default CompanySettingsContainer