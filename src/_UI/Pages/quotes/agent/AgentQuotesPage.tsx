import React from 'react'
import { useHistory } from 'react-router-dom';
import {ClientQuotesInner, ClientQuotesOuter} from "../client/quotes-client-styles";
import NoQuotesCard from "../NoQuotesCard";
import AgentQuotesTableContainer from "./table/AgentQuotesTableContainer";

type PropsType = {

}

const AgentQuotesPage:React.FC<PropsType> = () => {
    const no_quotes = false

    const history = useHistory()
    let setCardOpen = (quote_id: number) => {
        history.push(`/quotes/:${quote_id}`)
    }

    return (
        <ClientQuotesOuter>
            <ClientQuotesInner>
                {no_quotes
                    ? <NoQuotesCard text={"There are no active quotes at the moment."}/>
                    : <AgentQuotesTableContainer setCardOpen={setCardOpen }/>
                }
            </ClientQuotesInner>
        </ClientQuotesOuter>
    )
}


export default AgentQuotesPage