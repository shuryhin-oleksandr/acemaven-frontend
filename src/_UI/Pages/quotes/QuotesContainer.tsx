import React, {useEffect, useState} from 'react'
//BLL
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import {
    activateClientQuoteThunk,
    deleteQuoteFromClientListThunk,
    getClientQuotesThunk
} from "../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getClientQuotesListSelector} from "../../../_BLL/selectors/quotes/client/quotesClientSelector";
//components
import Layout from "../../components/BaseLayout/Layout";
import QuotesPage from "./client/QuotesPage";
import AgentQuotesPage from "./agent/AgentQuotesPage";
import {getCurrentShippingTypeSelector} from "../../../_BLL/selectors/rates&surcharge/ratesSelectors";


const QuotesContainer:React.FC = () => {
    //data from store
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0])
    const my_quotes_list = useSelector(getClientQuotesListSelector)
    const currentShippingType = useSelector(getCurrentShippingTypeSelector)

    //get quotes after mounting
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClientQuotesThunk('sea', '', '', '' ))
    }, [dispatch])

    //get quotes list sort by smth, filter by shipping type and search value
    let getQuotesByFilters = (type: string, field_name: string, search_column: string, search_value: string) => {
        dispatch(getClientQuotesThunk(type, field_name, search_column, search_value))
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
                : <AgentQuotesPage />
            }
        </Layout>
    )
}

export default QuotesContainer