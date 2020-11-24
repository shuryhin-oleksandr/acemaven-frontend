import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import {
    activateClientQuoteThunk,
    deleteQuoteFromClientListThunk,
    getClientQuotesThunk
} from "../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getClientQuotesListSelector} from "../../../_BLL/selectors/quotes/client/quotesClientSelector";
import {getAgentQuotesListThunk} from "../../../_BLL/thunks/quotes/agentQuotesThunk";
import {
    getAgentQuotesLIstSelector
} from "../../../_BLL/selectors/quotes/agent/agentQuoteSelector";
//components
import Layout from "../../components/BaseLayout/Layout";
import QuotesPage from "./client/QuotesPage";
import AgentQuotesPage from "./agent/AgentQuotesPage";
import {getShippingTypes} from "../../../_BLL/thunks/rates&surcharge/surchargeThunks";



const QuotesContainer:React.FC = () => {
    //data from store
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0])
    const my_quotes_list = useSelector(getClientQuotesListSelector) //client
    const agent_quotes_list = useSelector(getAgentQuotesLIstSelector) //agent

    //get quotes after mounting
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getShippingTypes(''))
        company_type?.type === 'client'
            ? dispatch(getClientQuotesThunk( mode, '', '', ''))
            : dispatch(getAgentQuotesListThunk(mode, '', '', ''))
    }, [dispatch, company_type])

    //get quotes list sort by smth, filter by shipping type and search value
    let getQuotesByFilters = (type: string, field_name: string, search_column: string, search_value: string) => {
        company_type.type === 'client'
            ? dispatch(getClientQuotesThunk(type, field_name, search_column, search_value))
            : dispatch(getAgentQuotesListThunk(type, field_name, search_column, search_value))
    }

    //CLIENT: active or pause quote
    let activeInactiveQuote = (id: number, is_active: boolean) => {
        dispatch(activateClientQuoteThunk(id, is_active))
    }
    //CLIENT: delete quote
    let deleteQuoteByClient = (id: number) => {
        dispatch(deleteQuoteFromClientListThunk(id))
    }


    const [isSearchMode, setSearchMode] = useState(false)
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState('')
    const [search_column, setSearchColumn] = useState('')

    return (
        <Layout>
            {company_type?.type === 'client'
                ? <QuotesPage my_quotes_list={my_quotes_list}
                              activeInactiveQuote={activeInactiveQuote}
                              deleteQuoteByClient={deleteQuoteByClient}
                              getQuotesByFilters={getQuotesByFilters}
                              setSearchMode={setSearchMode}
                              isSearchMode={isSearchMode}
                              mode={mode}
                              setMode={setMode}
                              searchValue={searchValue}
                              setSearchValue={setSearchValue}
                              search_column={search_column}
                              setSearchColumn={setSearchColumn}

                />
                : <AgentQuotesPage setSearchMode={setSearchMode}
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
        </Layout>
    )
}

export default QuotesContainer