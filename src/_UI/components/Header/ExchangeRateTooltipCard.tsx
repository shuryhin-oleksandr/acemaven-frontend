import _ from 'lodash';
import React from 'react'
//types
import {ExchangeRateType} from "../../../_BLL/types/billing/billingTypes";
import {VoidFunctionType} from "../../../_BLL/types/commonTypes";
//styles
import {
    ExchangeRateTooltipContainer,
    TodayHeader,
    TodayHeaderDate,
    TodayHeaderTitle,
    TodayExchange, OneBraz, CurrencyWrap, CurrencySpan, SumSpan
} from "./header-styles";



type PropsType = {
    moment_today: string,
    is_added_today: boolean,
    last_exchange?: ExchangeRateType | undefined,
    goToExchangePage: VoidFunctionType
}


const ExchangeRateTooltipCard: React.FC<PropsType> = ({moment_today, is_added_today, ...props}) => {

    let usd = props.last_exchange?.rates.find(r => r.currency === 'USD')
    let usd_rate = usd?.rate && _.ceil(parseFloat(`${1/Number(usd?.rate)}`), 2);

    let eur = props.last_exchange?.rates.find(r => r.currency === 'EUR')
    let eur_rate = eur?.rate && _.ceil(parseFloat(`${1/Number(eur?.rate)}`), 2);


    return (
        <ExchangeRateTooltipContainer onClick={props.goToExchangePage}>
            <TodayHeader>
                <TodayHeaderTitle>Today Exchange Rate</TodayHeaderTitle>
                <TodayHeaderDate>{moment_today}</TodayHeaderDate>
            </TodayHeader>
            <TodayExchange>
                <CurrencyWrap>
                    <CurrencySpan>1 USD /</CurrencySpan>
                    {is_added_today ? <OneBraz>{usd_rate} BRL</OneBraz> : 'N/A'}

                </CurrencyWrap>
                <CurrencyWrap>
                    <CurrencySpan>1 Eur /</CurrencySpan>
                    {is_added_today ? <OneBraz>{eur_rate} BRL</OneBraz> : 'N/A'}

                </CurrencyWrap>
            </TodayExchange>
        </ExchangeRateTooltipContainer>
    )
}

export default ExchangeRateTooltipCard