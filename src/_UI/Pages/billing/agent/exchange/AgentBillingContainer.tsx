import React, {useEffect, useRef, useState} from 'react'
//chart js
import Chart from 'chart.js';
import {getExchangeChartConfig} from "./chart_config";
import {useChartsUtils} from "./chart_utils";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {
    createNewExchangeRateThunk,
    getExchangeListThunk
} from "../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {agentBillingActions} from "../../../../../_BLL/reducers/billing/agent/AgentBillingReducer";
import {
    getAddingSuccessExchangeSelector,
    getAgentExchangeListSelector,
    repeatedExchangeSelector
} from "../../../../../_BLL/selectors/billing/agent/agentBillingSelector";
//components
import Layout from "../../../../components/BaseLayout/Layout";
import AgentBillingPage from "./AgentBillingPage";
import BillingExchangePopup from "../../../../components/PopUps/billing_exchange_popup/BIllingExchangePopup";
import ModalWindow from 'src/_UI/components/_commonComponents/ModalWindow/ModalWindow';



const AgentBillingContainer: React.FC = () => {

    //hooks
    const dispatch = useDispatch()
    const chartRef = useRef<HTMLCanvasElement | null>(null)
    const {setChartInstance, updateDataSet, updateLabels} = useChartsUtils()

    //lifecycle hooks - mounted
    useEffect(() => {
        dispatch(getExchangeListThunk())
        const myChartRef = chartRef.current?.getContext("2d");
        //@ts-ignore
        const newChartInstance = myChartRef && new Chart(myChartRef, getExchangeChartConfig(
            dates_labels,
            usd_rates,
            eur_rates,
        ));
        setChartInstance(newChartInstance);
    }, [])


    //data from store
    const {exchange_list, dates_labels, usd_rates, eur_rates} = useSelector(getAgentExchangeListSelector)
    const repeated_exchange = useSelector(repeatedExchangeSelector)
    const adding_exchange_success = useSelector(getAddingSuccessExchangeSelector)


    //lifecycle hook - update
    useEffect(() => {
        updateDataSet(0, usd_rates)
        updateDataSet(1, eur_rates)
        updateLabels(dates_labels)
    }, [exchange_list])

    //local state
    const [isProceed, setProceed] = useState(false)
    let setRepeatedExchangeHandler = (data: { rates: Array<{ currency: number, rate: string, spread: string }> } | null) => {
        dispatch(agentBillingActions.setRepeatedExchange(data))
    }
    let proceedRepeatedExchangeRate = () => {
        if (repeated_exchange) {
            dispatch(createNewExchangeRateThunk(repeated_exchange))
            setProceed(false)
        }
    }


    return (
        <Layout>
            <ModalWindow isOpen={isProceed}>
                <BillingExchangePopup setProceed={setProceed}
                                      repeated_exchange={repeated_exchange ? repeated_exchange : null}
                                      setRepeatedExchangeHandler={setRepeatedExchangeHandler}
                                      proceedRepeatedExchangeRate={proceedRepeatedExchangeRate}
                />
            </ModalWindow>
            <AgentBillingPage chartRef={chartRef}
                              exchange_list={exchange_list}
                              setProceed={setProceed}
                              setRepeatedExchangeHandler={setRepeatedExchangeHandler}
                              adding_exchange_success={adding_exchange_success}
            />
        </Layout>
    )
}

export default AgentBillingContainer

