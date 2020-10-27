import React from 'react'
import {ClientQuotesInner, ClientQuotesOuter} from "./quotes-client-styles";
import NoQuotesCard from "../NoQuotesCard";
import ClientQuotesTable from "./tables/ClientQuotesTable";

const QuotesPage = () => {
    const no_quotes = false

    const text = "There are no active quotes at the moment.\n" +
        "                If your searches don’t return any results,\n" +
        "                you will have the option to post them online for agents to bid on them.\n" +
        "                They will appear in this section."

    return (
        <ClientQuotesOuter>
            <ClientQuotesInner>
                {no_quotes
                    ? <NoQuotesCard text={text}/>
                    : <ClientQuotesTable />
                }
            </ClientQuotesInner>
        </ClientQuotesOuter>
    )
}

export default QuotesPage