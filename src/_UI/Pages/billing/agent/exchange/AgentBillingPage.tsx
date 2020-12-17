import React from "react";
import {
    BillingContent,
    BillingInner,
    BillingTitle,
    BillingWrapper,
    Canvas, ExchangeSpan,
    ExchangeSpanWrap, Round
} from "./agent-billing-styles";
import ExchangeTable from "./tables/ExchangeTable";

type PropsType = {
    chartRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const AgentBillingPage:React.FC<PropsType> = ({chartRef}) => {


    return (
        <BillingWrapper>
            <BillingInner>
                <BillingContent>
                    <BillingTitle>Exchange Rate</BillingTitle>
                    <ExchangeTable />
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