import React, {useEffect} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
import {getMySettingsThunk} from "../../../../_BLL/thunks/profile/profileThunks";
import {getMyInfoSelector, getMySettingsSelector} from "../../../../_BLL/selectors/profile/profileSelectors";
//components
import Layout from "../../../components/BaseLayout/Layout";
import GeneralSettingsPage from './GeneralSettingsPage';



const GeneralSettingsContainer:React.FC = () => {

    //data from store
    let my_info = useSelector(getMyInfoSelector )
    let company_type = my_info?.companies && my_info.companies.length > 0 && my_info.companies[0].type
    const my_settings = useSelector(getMySettingsSelector)

    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        my_info?.email_settings && dispatch(getMySettingsThunk(my_info?.email_settings))
        dispatch(commonActions.setCurrentNavPath('/settings/general'))
    }, [dispatch, my_info?.email_settings])


    return (
        <Layout >
            <GeneralSettingsPage company_type={String(company_type)}
                                 my_settings={my_settings}
            />
        </Layout>
    )
}

export default GeneralSettingsContainer