import React, {useEffect} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
//components
import Layout from "../../../components/BaseLayout/Layout";
import GeneralSettingsPage from './GeneralSettingsPage';


const GeneralSettingsContainer = () => {

    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/general'))
    }, [dispatch])

    //data from store
    let my_info = useSelector((state: AppStateType) => state.profile.authUserInfo)
    let company_type = my_info?.companies && my_info.companies.length > 0 && my_info.companies[0].type

    return (
        <Layout >
            <GeneralSettingsPage company_type={String(company_type)}/>
        </Layout>
    )
}

export default GeneralSettingsContainer