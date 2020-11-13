import React from 'react'
//components
import AgentSurchargeHandling from "./AgentSurchargeHandling";
import AgentSurchargeAdditional from "./AgentSurchargeAdditional";
//styles
import {AgentSurchargesTableWrapper} from "../agent-quotes-styles";



type PropsType = {

}

const AgentSurchargesTable:React.FC<PropsType> = ({}) => {
    return (
        <AgentSurchargesTableWrapper>
            <AgentSurchargeHandling />
            <AgentSurchargeAdditional />
        </AgentSurchargesTableWrapper>
    )
}

export default AgentSurchargesTable