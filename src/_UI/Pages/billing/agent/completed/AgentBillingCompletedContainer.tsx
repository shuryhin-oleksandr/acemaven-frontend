import React, {useEffect, useState} from 'react'
import Layout from "../../../../components/BaseLayout/Layout";
import AgentBillingCompletedPage from "./AgentBillingCompletedPage";
import {getBillingOperationsListThunk} from "../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {useDispatch, useSelector} from "react-redux";
import {getBillingOperationsListSelector} from "../../../../../_BLL/selectors/billing/agent/agentBillingSelector";


const AgentBillingCompletedContainer = () => {
    const [isSearchMode, setSearchMode] = useState(false)
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState('')
    const [search_column, setSearchColumn] = useState('')


    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillingOperationsListThunk(mode, '', '', '', 'completed'))
    }, [])

    //data from store
    const billing_list = useSelector(getBillingOperationsListSelector)


    return(
        <Layout>
           <AgentBillingCompletedPage search_column={search_column}
                                      setSearchColumn={setSearchColumn}
                                      mode={mode}
                                      setMode={setMode}
                                      searchValue={searchValue}
                                      setSearchValue={setSearchValue}
                                      isSearchMode={isSearchMode}
                                      setSearchMode={setSearchMode}
                                      billing_list={billing_list}
                                      thunkName={'billing'}
                                      billing_status={'completed'}
           />
        </Layout>
    )
}

export default AgentBillingCompletedContainer