import React from 'react'
//styles
import {NoRatesContent, NoRatesOuter, RegisterButton} from "./table/agent-quotes-styles";

type PropsType = {
    openCreatePopup: (value: boolean) => void
}

const NoRateSurchargeCard:React.FC<PropsType> = ({openCreatePopup}) => {
    return (
        <NoRatesOuter>
            <NoRatesContent>
                There are no freight rate and surcharges for these shipment dates.
                The offer won't be created until a matching freight rate and surcharges agreement is created.
            </NoRatesContent>
            <RegisterButton type={'button'} onClick={() => openCreatePopup(true)}>REGISTER NEW</RegisterButton>
        </NoRatesOuter>
    )
}

export default NoRateSurchargeCard

