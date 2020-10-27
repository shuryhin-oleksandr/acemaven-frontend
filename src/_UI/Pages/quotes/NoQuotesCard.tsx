import React from 'react'
import {NoQuotesContent, NoQuotesOuter} from "./client/quotes-client-styles";

type PropsType = {
    text: string
}

const NoQuotesCard:React.FC<PropsType> = ({text}) => {
    return (
        <NoQuotesOuter>
            <NoQuotesContent>
                {text}
            </NoQuotesContent>
        </NoQuotesOuter>
    )
}

export default NoQuotesCard