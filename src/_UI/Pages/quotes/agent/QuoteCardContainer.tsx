import React, {useEffect, useState} from 'react'
//react-router-dom
import {useHistory, withRouter} from "react-router-dom";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {
    getBadSavingMessageSelector,
    getCheckSurchargeResult,
    getExactQuoteInfoSelector,
    getExistingRateForQuoteSelector, getExistingSurchargeForQuoteSelector, saveRateResultSelector
} from "../../../../_BLL/selectors/quotes/agent/agentQuoteSelector";
import {
    getAirCarriersSelector,
    getSeaCarriersSelector
} from "../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
    getExactQuoteThunk,
    rejectQuoteThunk,
    withdrawOfferThunk
} from "../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {getCarriers} from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {quotesAgentActions} from "../../../../_BLL/reducers/quotes/quotesAgentReducer";
//components
import QuoteCard from "./QuoteCard";


const QuoteCardContainer = ({...props}) => {

    //local state
    let quote_id = props.match.params.id;
    const [isCreatePopup, openCreatePopup] = useState(false)
    const [isTemporaryPopup, setIsTemporaryPopup] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()

    //data from store
    const exact_quote_info = useSelector(getExactQuoteInfoSelector)
    const sea_carrier_list = useSelector(getSeaCarriersSelector)
    const air_carrier_list = useSelector(getAirCarriersSelector)
    const existing_rate_for_quote = useSelector(getExistingRateForQuoteSelector)
    const existing_surcharge_for_quote = useSelector(getExistingSurchargeForQuoteSelector)
    const checked_surcharge_result = useSelector(getCheckSurchargeResult)
    const save_rate_result = useSelector(saveRateResultSelector)
    const bad_saving_message = useSelector(getBadSavingMessageSelector)
    const isFetching = useSelector((state: AppStateType) => state.agent_quotes.isFetching)

//delete current quote info from store
    let unmountHandler = () => {
        dispatch(quotesAgentActions.setExactQuoteInfo(null))
        dispatch(quotesAgentActions.setCheckedIsSurchargeExist(''))
        //dispatch(quotesAgentActions.setExistingRateForQuote(null))
        dispatch(quotesAgentActions.setExistingSurchargeForQuote(null))
    }

    useEffect(() => {
        dispatch(getExactQuoteThunk(quote_id))
        dispatch(getCarriers())
        return () => {
            unmountHandler()
        }
    }, [])

    //for saving rate popup
    useEffect(() => {
        if (existing_rate_for_quote) {
            setIsTemporaryPopup(true)
        }
    }, [existing_rate_for_quote])


    //thunks
    const rejectQuoteHandler = () => {
        dispatch(rejectQuoteThunk(Number(exact_quote_info?.id), history))
    }
    const withdrawOfferHandler = () => {
        dispatch(withdrawOfferThunk(Number(exact_quote_info?.id), history))
    }
    //handlers
    const goToTheList = () => {
        history.push('/quotes')
    }

    return (
        <QuoteCard exact_quote_info={exact_quote_info ? exact_quote_info : null}
                   carrier_list={exact_quote_info?.shipping_type === 'sea' ? sea_carrier_list : air_carrier_list}
                   existing_rate_for_quote={existing_rate_for_quote}
                   existing_surcharge_for_quote={existing_surcharge_for_quote}
                   checked_surcharge_result={checked_surcharge_result}
                   save_rate_result={save_rate_result}
                   bad_saving_message={bad_saving_message}
                   rejectQuoteHandler={rejectQuoteHandler}
                   withdrawOfferHandler={withdrawOfferHandler}
                   isCreatePopup={isCreatePopup}
                   openCreatePopup={openCreatePopup}
                   isTemporaryPopup={isTemporaryPopup}
                   setIsTemporaryPopup={setIsTemporaryPopup}
                   history={history}
                   isFetching={isFetching}
                   goToTheList={goToTheList}
        />
    )
}

export default withRouter(QuoteCardContainer)