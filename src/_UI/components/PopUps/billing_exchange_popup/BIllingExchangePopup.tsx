import React from "react";
import {
    BillingButtonsWrap, BillingCancelButton,
    BillingExchangeTitle,
    BillingExchangeWrap,
    BillingPopupContainer,
    BillingPopupContent, BillingProceedButton, ExchangeCurrency, ExchangeRate, ExchangeWrap
} from "./billing_exchange_styles";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg'
import {CurrencyEnum} from "../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
    setProceed: (value: boolean) => void,
    repeated_exchange: {rates: Array<{currency: number, rate: string, spread: string}>} | null,
    setRepeatedExchangeHandler: (data: {rates: Array<{currency: number, rate: string, spread: string}>} | null) => void,
    proceedRepeatedExchangeRate: VoidFunctionType
}

const BillingExchangePopup:React.FC<PropsType> = ({setProceed, repeated_exchange, setRepeatedExchangeHandler, proceedRepeatedExchangeRate}) => {

    let usd = repeated_exchange?.rates.find(r => r.currency === CurrencyEnum.USD)
    let eur = repeated_exchange?.rates.find(r => r.currency === CurrencyEnum.EUR)


    let cancelHandler = () => {
        setProceed(false)
        setRepeatedExchangeHandler(null)
    }
    const {t} = useTranslation();
    return  (
        <BillingPopupContainer>
            <BillingPopupContent>
                <IconButton style={{position: 'absolute', top: '20px', right: '20px'}}
                            onClick={cancelHandler}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <BillingExchangeTitle>
                    {t("VESSEL/Today's rate has been already set, if you proceed you will rewrite it with a new one")}
                </BillingExchangeTitle>
                <BillingExchangeWrap>
                    <ExchangeWrap>
                        <ExchangeCurrency>USD</ExchangeCurrency>
                        <ExchangeRate>{usd?.rate}</ExchangeRate>
                    </ExchangeWrap>
                    <ExchangeWrap style={{marginRight: '0px'}}>
                        <ExchangeCurrency>EUR</ExchangeCurrency>
                        <ExchangeRate>{eur?.rate}</ExchangeRate>
                    </ExchangeWrap>
                </BillingExchangeWrap>
                <BillingButtonsWrap>
                    <BillingProceedButton onClick={() => proceedRepeatedExchangeRate()}>{t("VESSEL/PROCEED")}</BillingProceedButton>
                    <BillingCancelButton onClick={cancelHandler}>{t("Bookings/CANCEL")}</BillingCancelButton>
                </BillingButtonsWrap>
            </BillingPopupContent>
        </BillingPopupContainer>
    )
}

export default BillingExchangePopup