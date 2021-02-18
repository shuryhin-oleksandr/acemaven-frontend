import moment from 'moment';
import React from 'react'
//styles
import {
    ExchangeRateTooltipContainer,
    TodayHeader,
    TodayHeaderDate,
    TodayHeaderTitle,
    TodayExchange
} from "./header-styles";

const ExchangeRateTooltipCard: React.FC = () => {
    let today = new Date()
    let moment_today = moment(today).format('DD/MM/YYYY')

    return (
        <ExchangeRateTooltipContainer>
            <TodayHeader>
                <TodayHeaderTitle>Today Exchange Rate</TodayHeaderTitle>
                <TodayHeaderDate>{moment_today}</TodayHeaderDate>
            </TodayHeader>
            <TodayExchange>

            </TodayExchange>
        </ExchangeRateTooltipContainer>
    )
}

export default ExchangeRateTooltipCard