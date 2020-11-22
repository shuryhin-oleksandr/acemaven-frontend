import React from 'react'
//react-router-dom
import { useHistory } from 'react-router-dom';
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
//types
import {QuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
//components
import NoQuotesCard from "../NoQuotesCard";
import AgentQuotesTableContainer from "./table/AgentQuotesTableContainer";
import TableSkeleton from "../../../skeleton/general/TableSkeleton";
//styles
import {ClientQuotesInner, ClientQuotesOuter} from "../client/quotes-client-styles";


type PropsType = {
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

const AgentQuotesPage:React.FC<PropsType> = ({searchValue,setSearchValue, mode, setMode, getQuotesByFilters,
                                                 search_column, setSearchColumn, setSearchMode, isSearchMode, agent_quotes_list}) => {

    const isFetching = useSelector((state: AppStateType) => state.agent_quotes.isFetching)

    const history = useHistory()
    let setCardOpen = (quote_id: number) => {
        history.push(`/quotes/${quote_id}`)
    }

    return (
        <>
            {isFetching
                ? <TableSkeleton />
                : <ClientQuotesOuter>
                    <ClientQuotesInner>
                        {agent_quotes_list.length === 0
                            ? <NoQuotesCard text={"There are no active general at the moment."}/>
                            : <AgentQuotesTableContainer setCardOpen={setCardOpen}
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
                        }
                    </ClientQuotesInner>
                </ClientQuotesOuter>
            }
        </>

    )
}


export default AgentQuotesPage