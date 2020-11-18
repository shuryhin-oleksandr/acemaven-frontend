import React from 'react'
//components
import AgentSurchargeHandling from "./AgentSurchargeHandling";
import AgentSurchargeAdditional from "./AgentSurchargeAdditional";
//types
import {SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//styles
import {AgentSurchargesTableWrapper} from "../agent-quotes-styles";




type PropsType = {
    surcharges: SurchargeInfoType | null
}

const AgentSurchargesTable:React.FC<PropsType> = ({surcharges}) => {
    return (
        <AgentSurchargesTableWrapper>
            {surcharges?.usage_fees && surcharges.usage_fees.length > 0 && <AgentSurchargeHandling usage_fees={surcharges.usage_fees}/>}
            <AgentSurchargeAdditional charges={surcharges?.charges ? surcharges?.charges : []}/>
        </AgentSurchargesTableWrapper>
    )
}

export default AgentSurchargesTable