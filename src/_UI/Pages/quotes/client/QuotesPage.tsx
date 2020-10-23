import React from 'react'
import {ClientQuotesInner, ClientQuotesOuter} from "./quotes-client-styles";
import NoQuotesCard from "./NoQuotesCard";
import ClientQuotesTable from "./tables/ClientQuotesTable";

const QuotesPage = () => {
    const no_quotes = false

    return (
        <ClientQuotesOuter>
            <ClientQuotesInner>
                {no_quotes
                    ? <NoQuotesCard/>
                    : <ClientQuotesTable />
                }
            </ClientQuotesInner>
        </ClientQuotesOuter>
    )
}

export default QuotesPage