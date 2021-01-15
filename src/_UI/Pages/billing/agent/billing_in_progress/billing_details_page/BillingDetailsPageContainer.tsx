import React, {useEffect} from 'react'
//moment js
import moment from "moment";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//react-router-dom
import {useHistory, useParams} from "react-router-dom";
//BLL
import {getBillingInProgressDetailsThunk} from "../../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {getBillingOperationDetailsSelector} from "../../../../../../_BLL/selectors/billing/agent/agentBillingSelector";
//components
import Layout from "../../../../../components/BaseLayout/Layout";
import BillingDetailsPage from "./BillingDetailsPage";



const BillingDetailsPageContainer:React.FC = () => {

    //hooks
    const history = useHistory()
    let query = useParams()
    // @ts-ignore
    let id = query.id
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillingInProgressDetailsThunk(id))
    }, [])

    //local state
    let local_time = moment(new Date()).format(" DD/MM  h:mm a");

    //data from store
    let billing_details = useSelector(getBillingOperationDetailsSelector)

    //handlers
      let goBackHandler = () => history.push('/billing_in_progress')

    return (
        <Layout>
            <BillingDetailsPage billing_details={billing_details ?? null}
                                goBackHandler={goBackHandler}
                                local_time={local_time}
            />
        </Layout>
    )
}

export default BillingDetailsPageContainer