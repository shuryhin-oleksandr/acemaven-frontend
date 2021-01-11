import React from "react";
//types
import {ExchangeRateType} from "../../../../../_BLL/types/billing/billingTypes";
//components
import ExchangeTable from "./tables/ExchangeTable";
//styles
import {
    BillingContent,
    BillingInner,
    BillingTitle,
    BillingWrapper,
    Canvas, ExchangeSpan,
    ExchangeSpanWrap, Round
} from "./agent-billing-styles";


type PropsType = {
    chartRef: React.MutableRefObject<HTMLCanvasElement | null>,
    exchange_list: ExchangeRateType[],
    setProceed: (value: boolean) => void,
    setRepeatedExchangeHandler: (data: {rates: Array<{currency: number, rate: string, spread: string}>} | null) => void,
    adding_exchange_success: boolean
}

const AgentBillingPage:React.FC<PropsType> = ({chartRef, exchange_list, setProceed, setRepeatedExchangeHandler, ...props}) => {

    return (
        <BillingWrapper>
            <BillingInner>
                <BillingContent>
                    <BillingTitle>Exchange Rate</BillingTitle>
                    <ExchangeTable exchange_list={exchange_list}
                                   setProceed={setProceed}
                                   setRepeatedExchangeHandler={setRepeatedExchangeHandler}
                                   adding_exchange_success={props.adding_exchange_success}
                    /> {/*form*/}
                    <div style={{display: 'flex', marginBottom: '20px'}}>
                        <ExchangeSpanWrap>
                            <Round background='#115b86'/>
                            <ExchangeSpan>USD</ExchangeSpan>
                        </ExchangeSpanWrap>
                        <ExchangeSpanWrap >
                            <Round />
                            <ExchangeSpan>EUR</ExchangeSpan>
                        </ExchangeSpanWrap>
                    </div>
                    <Canvas id="myChart" ref={chartRef} />
                </BillingContent>
            </BillingInner>
        </BillingWrapper>

    )
}

export default AgentBillingPage