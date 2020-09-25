import React, {useEffect} from 'react'
import Layout from "../../../components/BaseLayout/Layout";

import GeneralSettingsPage from './GeneralSettingsPage';
import {useDispatch} from "react-redux";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";

const GeneralSettingsContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/general'))
    }, [dispatch])

    return (
        <Layout >
            <GeneralSettingsPage/>
        </Layout>
    )
}

export default GeneralSettingsContainer