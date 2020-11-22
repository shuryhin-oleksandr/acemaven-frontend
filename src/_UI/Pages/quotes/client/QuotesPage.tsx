import React from 'react'
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
//types
import {QuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
//components
import NoQuotesCard from "../NoQuotesCard";
import ClientQuotesTable from "./tables/ClientQuotesTable";
import QuotesTableSkeleton from "../../../skeleton/quotes/QuotesTableSkeleton";
//styles
import {ClientQuotesInner, ClientQuotesOuter} from "./quotes-client-styles";


type PropsType = {
    my_quotes_list: QuoteType[],
    activeInactiveQuote: (id: number, is_active: boolean) => void,
    deleteQuoteByClient: (id: number) => void,
    getQuotesByFilters: (type: string, field_name: string, search_column: string, search_value: string) => void,
    setSearchMode: (value: boolean) => void
    isSearchMode: boolean
    mode: string
    setMode: (value: string) => void
    searchValue: string
    setSearchValue: (value: string) => void
    search_column: string
    setSearchColumn: (value: string) => void
}

const QuotesPage:React.FC<PropsType> = ({my_quotes_list, activeInactiveQuote, deleteQuoteByClient, getQuotesByFilters, ...props}) => {


    const text = "There are no active quotes at the moment.\n" +
        "                If your searches don’t return any results,\n" +
        "                you will have the option to post them online for agents to bid on them.\n" +
        "                They will appear in this section."
    const isFetching = useSelector((state: AppStateType) => state.client_quotes.isFetching)

    return (
        <>
            {isFetching
                ? <QuotesTableSkeleton />
                : <ClientQuotesOuter>
                    <ClientQuotesInner>
                        {my_quotes_list.length === 0
                            ? <NoQuotesCard text={text}/>
                            : <ClientQuotesTable my_quotes_list={my_quotes_list}
                                                 activeInactiveQuote={activeInactiveQuote}
                                                 deleteQuoteByClient={deleteQuoteByClient}
                                                 getQuotesByFilters={getQuotesByFilters}
                                                 setSearchMode={props.setSearchMode}
                                                 isSearchMode={props.isSearchMode}
                                                 mode={props.mode}
                                                 setMode={props.setMode}
                                                 searchValue={props.searchValue}
                                                 setSearchValue={props.setSearchValue}
                                                 search_column={props.search_column}
                                                 setSearchColumn={props.setSearchColumn}

                            />
                        }
                    </ClientQuotesInner>
                </ClientQuotesOuter>
            }

        </>

    )
}

export default QuotesPage