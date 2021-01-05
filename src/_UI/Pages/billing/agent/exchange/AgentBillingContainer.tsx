import React, {useEffect, useRef, useState} from 'react'
import Chart from 'chart.js';
import {getExchangeChartConfig} from "./chart_config";
import {useChartsUtils} from "./chart_utils";
import Layout from "../../../../components/BaseLayout/Layout";
import AgentBillingPage from "./AgentBillingPage";
import {useDispatch, useSelector} from "react-redux";
import {
    createNewExchangeRateThunk,
    getExchangeListThunk
} from "../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {
    getAgentExchangeListSelector,
    repeatedExchangeSelector
} from "../../../../../_BLL/selectors/billing/agent/agentBillingSelector";
import BillingExchangePopup from "../../../../components/PopUps/billing_exchange_popup/BIllingExchangePopup";
import ModalWindow from 'src/_UI/components/_commonComponents/ModalWindow/ModalWindow';
import {agentBillingActions} from "../../../../../_BLL/reducers/billing/agent/AgentBillingReducer";


type PropsType = {}

const AgentBillingContainer: React.FC<PropsType> = ({}) => {

    // let labels = [
    //     '10/12','11/12','12/12','13/12','14/12','15/12','16/12',
    //     '17/12','18/12','19/12','20/12','21/12','22/12', '23/12', '24/12', '25/12', '26/12','27/12','28/12','29/12','30/12','31/12'
    // ]
    // let commonSales = [100, 50, 309,455,346,449,433, 240, 150, 68, 330,450,120,349,340,120]
    // let withMoney = [230,344,233,454,492,434,333,234,124,566,567,234,456]

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
            />
        </Layout>
    )
}

export default AgentBillingContainer

