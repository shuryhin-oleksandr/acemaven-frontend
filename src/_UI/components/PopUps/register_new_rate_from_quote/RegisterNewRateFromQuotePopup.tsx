import React from 'react'
//react-hook-form
import {Controller, useForm, FormProvider} from "react-hook-form";
//material ui
import {IconButton} from "@material-ui/core";
//components
import SurchargeRateSelect from "../../_commonComponents/select/SurchargeRateSelect";
import QuoteAgentExpirationDate from "../../../Pages/quotes/agent/dates/QuoteAgentExpirationDate";
import RatesForQuotesTable from "./RatesForQuotesTables";
import SurchargesForQuotesTables from "./surcharge_tables/SurchargesForQuotesTables";
//styles
import {
    FormButton,
    FormButtonsWrapper, FormCancelButton,
    HeaderControllers,
    RegisterRateContent,
    RegisterRateInner,
    RegisterRateWrapper
} from "./register-new-rate-from-quote-styles";
import {GeneralTitle} from "../../../Pages/quotes/agent/table/agent-quotes-styles";
//icons
import close_icon from '../../../../_UI/assets/icons/close-icon.svg'


type PropsType = {
    openCreatePopup: (value: boolean) => void
}

const RegisterNewRateFromQuotePopup:React.FC<PropsType> = ({openCreatePopup}) => {
    const methods = useForm({
        reValidateMode: 'onBlur', mode: 'onSubmit'
    })
    const onSubmit = (values: any) => {
        console.log(values)
    }

    return(
        <FormProvider {...methods}>
            <RegisterRateWrapper onSubmit={methods.handleSubmit(onSubmit)}>
                <RegisterRateInner>
                    <IconButton onClick={() => openCreatePopup(false)}
                                style={{position: 'absolute', top: '20px', right: '20px'}}>
                        <img src={close_icon} alt=""/>
                    </IconButton>
                    <RegisterRateContent>
                        <HeaderControllers>
                            <div style={{display: "flex", flexDirection: 'column', maxWidth: '300px', width: '100%',marginRight: '35px'}}>
                                <GeneralTitle margin_bottom='10px'>CARRIER</GeneralTitle>
                                <Controller name='carrier'
                                            control={methods.control}
                                            rules={{
                                                required: 'Field is required'
                                            }}
                                            as={
                                                <SurchargeRateSelect placeholder='Carrier company name'
                                                                     error={methods.errors?.carrier?.message}
                                                    //maxW='300px'
                                                                     marginRight='35px'
                                                />
                                            }
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: 'column', maxWidth: '300px', width: '100%',marginRight: '35px'}}>
                                <GeneralTitle margin_bottom='15px'>EXPIRATION DATE</GeneralTitle>
                                <QuoteAgentExpirationDate control={methods.control}
                                                          setValue={methods.setValue}
                                />
                            </div>
                        </HeaderControllers>
                        <RatesForQuotesTable />
                        <SurchargesForQuotesTables />
                        <FormButtonsWrapper>
                            <FormButton>SEND</FormButton>
                            <FormCancelButton>CANCEL</FormCancelButton>
                        </FormButtonsWrapper>
                    </RegisterRateContent>
                </RegisterRateInner>
            </RegisterRateWrapper>
        </FormProvider>

    )
}

export default RegisterNewRateFromQuotePopup