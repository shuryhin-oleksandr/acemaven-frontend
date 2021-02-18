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
    let usd_rate = usd?.rate && _.ceil(parseFloat(usd?.rate), 2)

    let eur = props.last_exchange?.rates.find(r => r.currency === 'EUR')
    let eur_rate = eur?.rate && _.ceil(parseFloat(eur?.rate), 2)


    return (
        <ExchangeRateTooltipContainer onClick={props.goToExchangePage}>
            <TodayHeader>
                <TodayHeaderTitle>Today Exchange Rate</TodayHeaderTitle>
                <TodayHeaderDate>{moment_today}</TodayHeaderDate>
            </TodayHeader>
            <TodayExchange>
                <OneBraz>1 BRL</OneBraz>
                <CurrencyWrap>
                    <CurrencySpan>USD</CurrencySpan>
                    <SumSpan>{is_added_today ? usd_rate : 'N/A'}</SumSpan>
                </CurrencyWrap>
                <CurrencyWrap>
                    <CurrencySpan>Eur</CurrencySpan>
                    <SumSpan>{is_added_today ? eur_rate : 'N/A'}</SumSpan>
                </CurrencyWrap>
            </TodayExchange>
        </ExchangeRateTooltipContainer>
    )
}

export default ExchangeRateTooltipCard