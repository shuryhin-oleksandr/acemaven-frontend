import React, {useEffect} from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {saveRateToMyListThunk} from "../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {quotesAgentActions} from "../../../../_BLL/reducers/quotes/quotesAgentReducer";
//styles
import {
    ButtonsContainer, CancelButton,
    Question,
    SaveButton,
    TemporaryContent,
    TemporaryInner,
    TemporaryWrapper
} from "./save-temporary-styles";
import {HelperText} from "../../_commonComponents/Input/input-styles";
//icons
import close_icon from '../../../assets/icons/close-icon.svg';


type PropsType = {
    closePopup: (value: boolean) => void,
    freight: any,
    saveRateResult: boolean,
    bad_saving_message: string
}

const SaveTemporaryQuotePopup:React.FC<PropsType> = ({closePopup, freight, saveRateResult, bad_saving_message}) => {

    let freight_obj = {...freight, carrier: freight.carrier.id, shipping_mode: freight.shipping_mode.id, origin: freight.origin.id, destination: freight.destination.id}
    let freight_obj2 = {...freight_obj, rates: freight_obj.rates.map((r: any) => (
        {
            container_type: r.container_type ? r.container_type.id : null,
            currency: r.currency.id,
            start_date: r.start_date,
            expiration_date: r.expiration_date,
            rate: r.rate
        }))}

    const dispatch = useDispatch()
    let saveHandler = () => {
        dispatch(saveRateToMyListThunk(Number(freight?.id), freight_obj2))
    }
    let cancelHandler = () => {
       dispatch(quotesAgentActions.setSaveRateToYourResult(true))
        dispatch(quotesAgentActions.setBadSavingRateToList(''))
    }

    useEffect(() => {
        if(saveRateResult) {
            closePopup(false)
            dispatch(quotesAgentActions.setBadSavingRateToList(''))
        }
    }, [saveRateResult])

    return (
        <TemporaryWrapper>
            <TemporaryInner>
                <IconButton onClick={cancelHandler} style={{position: 'absolute', top: '20px', right: '20px'}}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <TemporaryContent>
                    <Question>Do you want to save the rate and surcharges in your rates?</Question>
                    <ButtonsContainer>
                        <SaveButton onClick={saveHandler}>SAVE</SaveButton>
                        <CancelButton onClick={cancelHandler}>CANCEL</CancelButton>
                    </ButtonsContainer>
                    {bad_saving_message && <HelperText style={{fontSize: '14px', textAlign: 'left'}}>{bad_saving_message}</HelperText>}
                </TemporaryContent>
            </TemporaryInner>
        </TemporaryWrapper>
    )
}

export default SaveTemporaryQuotePopup