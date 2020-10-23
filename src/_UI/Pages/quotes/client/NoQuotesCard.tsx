import React from 'react'
import {NoQuotesContent, NoQuotesOuter} from "./quotes-client-styles";

const NoQuotesCard = () => {
    return (
        <NoQuotesOuter>
            <NoQuotesContent>
                There are no active quotes at the moment.
                If your searches don’t return any results,
                you will have the option to post them online for agents to bid on them.
                They will appear in this section.
            </NoQuotesContent>
        </NoQuotesOuter>
    )
}

export default NoQuotesCard