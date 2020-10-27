import React, {useState} from 'react'
import {ClientQuotesInner, ClientQuotesOuter} from "../client/quotes-client-styles";
import NoQuotesCard from "../NoQuotesCard";
import AgentQuotesTableContainer from "./table/AgentQuotesTableContainer";

type PropsType = {

}

const AgentQuotesPage:React.FC<PropsType> = () => {
    const no_quotes = false

    const [isCardOpen, setCardOpen] = useState(false)

    return (
        <ClientQuotesOuter>
            <ClientQuotesInner>
                {no_quotes
                    ? <NoQuotesCard text={"There are no active quotes at the moment."}/>
                    : <AgentQuotesTableContainer isCardOpen={isCardOpen} setCardOpen={setCardOpen }/>
                }
            </ClientQuotesInner>
        </ClientQuotesOuter>
    )
}


export default AgentQuotesPage