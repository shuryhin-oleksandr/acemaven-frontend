import React from 'react'
import AgentQuotesTable from "./AgentQuotesTable";
import {QuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";

type PropsType = {
    setCardOpen: (value: number) => void,
    setSearchMode: (value: boolean) => void
    isSearchMode: boolean
    mode: string
    setMode: (value: string) => void
    searchValue: string
    setSearchValue: (value: string) => void
    search_column: string
    setSearchColumn: (value: string) => void,
    getQuotesByFilters: (type: string, field_name: string, search_column: string, search_value: string) => void,
    agent_quotes_list: QuoteType[]
}

const AgentQuotesTableContainer:React.FC<PropsType> = ({ setCardOpen, searchValue,setSearchValue, mode, setMode, getQuotesByFilters, agent_quotes_list,
                                                           search_column, setSearchColumn, setSearchMode, isSearchMode}) => {
    return (
        <AgentQuotesTable setCardOpen={setCardOpen}
                          setSearchMode={setSearchMode}
                          isSearchMode={isSearchMode}
                          mode={mode}
                          setMode={setMode}
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                          search_column={search_column}
                          setSearchColumn={setSearchColumn}
                          getQuotesByFilters={getQuotesByFilters}
                          agent_quotes_list={agent_quotes_list}

        />
    )
}

export default AgentQuotesTableContainer