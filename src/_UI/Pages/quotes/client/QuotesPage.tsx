import React from 'react'
//types
import {QuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
//components
import ClientQuotesTable from "./tables/ClientQuotesTable";
//styles
import {ClientQuotesInner, ClientQuotesOuter} from "./quotes-client-styles";
import {useTranslation} from "react-i18next";



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
  const {t} = useTranslation();

    return (
        <>
                 <ClientQuotesOuter>
                    <ClientQuotesInner>
                            <ClientQuotesTable  my_quotes_list={my_quotes_list}
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
                                                 text={t("Quotes/There are_If your")}

                            />
                    </ClientQuotesInner>
                </ClientQuotesOuter>
        </>

    )
}

export default QuotesPage