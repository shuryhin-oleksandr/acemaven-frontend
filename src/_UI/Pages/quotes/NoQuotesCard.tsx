import React from 'react'
import {NoQuotesContent, NoQuotesOuter} from "./client/quotes-client-styles";

type PropsType = {
    text: string,
    margin?: string
}

const NoQuotesCard:React.FC<PropsType> = ({text, margin}) => {
    return (
        <NoQuotesOuter style={{margin: margin}}>
            <NoQuotesContent>
                {text}
            </NoQuotesContent>
        </NoQuotesOuter>
    )
}

export default NoQuotesCard