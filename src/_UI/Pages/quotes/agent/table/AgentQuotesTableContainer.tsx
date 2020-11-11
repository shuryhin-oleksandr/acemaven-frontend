import React from 'react'
import QuoteCard from "../QuoteCard";
import AgentQuotesTable from "./AgentQuotesTable";

type PropsType = {
    setCardOpen: (value: number) => void
}

const AgentQuotesTableContainer:React.FC<PropsType> = ({ setCardOpen}) => {
    return (
        <AgentQuotesTable setCardOpen={setCardOpen}/>
    )
}

export default AgentQuotesTableContainer