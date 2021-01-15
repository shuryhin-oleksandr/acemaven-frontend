import React, {useEffect, useState} from 'react'
import Layout from "../../../../components/BaseLayout/Layout";
import AgentBillingInProgressPage from "./AgentBillingInProgressPage";
import {useDispatch, useSelector} from "react-redux";
import {getBillingOperationsListThunk} from "../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {getBillingOperationsListSelector} from "../../../../../_BLL/selectors/billing/agent/agentBillingSelector";
import { useHistory } from 'react-router-dom';



const AgentBillingInProgressContainer:React.FC = ({}) => {
    //local state
    const [isSearchMode, setSearchMode] = useState(false)
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState('')
    const [search_column, setSearchColumn] = useState('')

    //hooks
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillingOperationsListThunk(mode, '', '', '', 'active'))
    }, [])

    //data from store
    const billing_list = useSelector(getBillingOperationsListSelector)

    //handlers
    let goToPageHandler = (id: number) => {
        history.push(`/billing_in_progress/${id}`)
    }


    return (
        <Layout>
            <AgentBillingInProgressPage search_column={search_column}
                                        setSearchColumn={setSearchColumn}
                                        mode={mode}
                                        setMode={setMode}
                                        searchValue={searchValue}
                                        setSearchValue={setSearchValue}
                                        isSearchMode={isSearchMode}
                                        setSearchMode={setSearchMode}
                                        billing_list={billing_list}
                                        thunkName={'billing'}
                                        billing_status={'active'}
                                        goToPageHandler={goToPageHandler}
            />
        </Layout>
    )
}

export default AgentBillingInProgressContainer