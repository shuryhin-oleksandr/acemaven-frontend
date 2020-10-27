import React from 'react'
import QuoteCard from "../QuoteCard";
import AgentQuotesTable from "./AgentQuotesTable";

type PropsType = {
    isCardOpen: boolean,
    setCardOpen: (value: boolean) => void
}

const AgentQuotesTableContainer:React.FC<PropsType> = ({isCardOpen, setCardOpen}) => {

    return (
        <>
            {isCardOpen
                ? <QuoteCard setCardOpen={setCardOpen}/>
                : <AgentQuotesTable setCardOpen={setCardOpen}/>
            }
        </>
    )
}

export default AgentQuotesTableContainer