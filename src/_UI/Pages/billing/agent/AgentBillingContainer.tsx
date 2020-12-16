import React, {useEffect, useRef} from 'react'
import Chart from 'chart.js';
import {getExchangeChartConfig} from "./chart_config";
import {useChartsUtils} from "./chart_utils";
import Layout from "../../../components/BaseLayout/Layout";

import AgentBillingPage from "./AgentBillingPage";



const AgentBillingContainer = () => {

    let labels = [
        '10/12','11/12','12/12','13/12','14/12','15/12','16/12',
        '17/12','18/12','19/12','20/12','21/12','22/12', '23/12', '24/12', '25/12', '26/12','27/12','28/12','29/12','30/12','31/12'
    ]
    let commonSales = [100, 50, 309,455,666,789,433, 240, 150, 68, 330,450,120,349,340,120]
    let withMoney = [230,344,233,454,492,434,333,234,124,566,567,234,456]

    const chartRef = useRef<HTMLCanvasElement | null>(null)

    const {setChartInstance, updateDataSet, updateLabels} = useChartsUtils()

    useEffect(() => {
        const myChartRef = chartRef.current?.getContext("2d");
        //@ts-ignore
        const newChartInstance = myChartRef && new Chart(myChartRef, getExchangeChartConfig(
            labels,
            commonSales,
            withMoney,
        ));
        setChartInstance(newChartInstance);
    }, [])

    return (
        <Layout>
            <AgentBillingPage chartRef={chartRef}/>
        </Layout>


    )
}

export default AgentBillingContainer

