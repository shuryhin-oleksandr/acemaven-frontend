import React, {useEffect, useState} from 'react'
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//react-redux
import {useDispatch} from "react-redux";
//moment js
import moment from "moment";
//material ui
import {Tooltip} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
//BLL
import {
     getExistingSurchargesForQuoteThunk,
    submitQuoteThunk,
} from "../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {quotesAgentActions} from "../../../../_BLL/reducers/quotes/quotesAgentReducer";
//types
import {AgentQuoteType, RateQuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
import {CarrierType} from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import {SurchargeInfoType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
//components
import CargoTable from "./CargoTable";
import FrateRatesTable from "./table/FrateRatesTable";
import Layout from "../../../components/BaseLayout/Layout";
import NoRateSurchargeCard from "./NoRateSurchargeCard";
import RegisterNewRateFromQuotePopup
    from "../../../components/PopUps/register_new_rate_from_quote/RegisterNewRateFromQuotePopup";
import SurchargeRateSelect from "../../../components/_commonComponents/select/SurchargeRateSelect";
import AgentSurchargesTable from "./table/surcharge/AgentSurchargesTable";
import SaveTemporaryQuotePopup from "../../../components/PopUps/save_temporary_rate_popup/SaveTemporaryQuotePopup";
import TotalCostCalculationContainer from "./table/TotalCostCalculationContainer";
import SpinnerForAuthorizedPages from "../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";
import ModalWindow from "../../../components/_commonComponents/ModalWindow/ModalWindow";
//styles
import {
    ActionsAgentWrap,
    CardHeader,
    CardTitle,
    CargoContentWrapper,
    CargoInfo,
    CargoShippingModeWrap,
    CarrierInfo,
    CarrierWrap,
    Content,
    ContentRow,
    GeneralInfo,
    GeneralInfoContent,
    GeneralTitle,
    QuoteCardInner,
    QuoteCardWrapperForm,
    QuoteInfo,
    QuoteOpenStatus,
    RejectButton,
    RowTitle,
    RowValue,
    ShipmentInfo,
    ShipmentRow,
    ShipmentRowTitle,
    ShipmentRowWeek,
    ShipmentType,
    SubmitQuoteButton,
    SurchargesInfo
} from "./table/agent-quotes-styles";
//icons
import sea_type from '../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import air_type from '../../../assets/icons/rates&services/plane-surcharge.svg'
import dates_icon from '../../../../_UI/assets/icons/date_1.svg'



const useStyles = makeStyles({
    customTooltip: {
        maxWidth: 330,
        height: 60,
        fontFamily: "Helvetica Reg",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px",
    },
});

type PropsType = {
    exact_quote_info: AgentQuoteType | null,
    carrier_list: CarrierType[] | null,
    existing_rate_for_quote:  RateQuoteType | null,
    existing_surcharge_for_quote:  SurchargeInfoType | null,
    checked_surcharge_result: string,
    save_rate_result: boolean,
    bad_saving_message: string,
    withdrawOfferHandler: VoidFunctionType,
    rejectQuoteHandler: VoidFunctionType,
    isCreatePopup: boolean,
    openCreatePopup: (value:boolean) => void,
    isTemporaryPopup: boolean,
    setIsTemporaryPopup: (value:boolean) => void,
    history: any,
    isFetching: boolean
}


const QuoteCard:React.FC<PropsType> = ({...props}) => {

    const dispatch = useDispatch()
    const classes = useStyles();

    const {control, errors, handleSubmit, watch} = useForm({
        reValidateMode: "onBlur"
    })

    let carrier_field = watch('carrier')

    const onSubmit = () => {
        dispatch(submitQuoteThunk(Number(props.exact_quote_info?.id), Number(props.existing_rate_for_quote?.id), props.history))
    }

    const [isCheck, setIsCheck] = useState(false)

    let quote_data = {
        shipping_mode: Number(props.exact_quote_info?.shipping_mode.id),
        origin: Number(props.exact_quote_info?.origin.id),
        destination: Number(props.exact_quote_info?.destination.id),
        carrier: carrier_field,
        cargo_groups: props.exact_quote_info?.cargo_groups
            ? props.exact_quote_info?.cargo_groups.map(c => (c.container_type
                ? {...c, container_type: Number(c.container_type?.id)}
                : {...c, packaging_type: Number(c.packaging_type?.id)}))
            : [],
        date_from: String(props.exact_quote_info?.date_from),
        date_to: String(props.exact_quote_info?.date_to)
    }
   useEffect(() => {
        if(carrier_field) {
            dispatch(quotesAgentActions.setExistingRateForQuote(null))
            dispatch(quotesAgentActions.setExistingSurchargeForQuote(null))
            dispatch(quotesAgentActions.setSaveRateToYourResult(false))
            // @ts-ignore
            dispatch(getExistingSurchargesForQuoteThunk(quote_data))
        }
    }, [carrier_field])

    //refactoring dates
    let a = moment(props.exact_quote_info?.date_from, 'DD/MM/YYYY').toDate()
    let day_from = moment(a).format('DD/MM')
    let c = moment(props.exact_quote_info?.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('DD/MM')


    return (
        <Layout>
            <ModalWindow isOpen={props.isCreatePopup}>
                <RegisterNewRateFromQuotePopup openCreatePopup={props.openCreatePopup}
                                               setIsTemporaryPopup={props.setIsTemporaryPopup}
                                               carrier_field={carrier_field}
                                               quote={props.exact_quote_info}
                                               carriers={props.carrier_list ? props.carrier_list : []}
                                               existing_rate_for_quote={props.existing_rate_for_quote}
                                               existing_surcharge_for_quote={props.existing_surcharge_for_quote}
                                               save_rate_result={props.save_rate_result}
                                               isCheck={isCheck}
                                               setIsCheck={setIsCheck}
                />
            </ModalWindow>
            <ModalWindow isOpen={props.isTemporaryPopup}>
                <SaveTemporaryQuotePopup closePopup={props.setIsTemporaryPopup}
                                         freight={props.existing_rate_for_quote}
                                         saveRateResult={props.save_rate_result}
                                         bad_saving_message={props.bad_saving_message}
                />
            </ModalWindow>
            {props.isFetching || !props.exact_quote_info
                ? <SpinnerForAuthorizedPages />
                : <QuoteCardWrapperForm onSubmit={handleSubmit(onSubmit)}>
                    <QuoteCardInner>
                        <CardHeader>
                            <CardTitle>Quotes</CardTitle>
                            {!props.exact_quote_info?.is_submitted
                                ? <ActionsAgentWrap>
                                    <QuoteOpenStatus>Open</QuoteOpenStatus>
                                    <SubmitQuoteButton disabled={!props.existing_rate_for_quote} type={'submit'}>SUBMIT
                                        QUOTE</SubmitQuoteButton>
                                    <Tooltip arrow
                                             title='By clicking reject you will delete this quote from your list.'
                                             classes={{tooltip: classes.customTooltip}}
                                    >
                                        <RejectButton onClick={props.rejectQuoteHandler}
                                                      type={'button'}>REJECT</RejectButton>
                                    </Tooltip>
                                </ActionsAgentWrap>
                                : <ActionsAgentWrap>
                                    <QuoteOpenStatus>Offer submitted</QuoteOpenStatus>
                                    <Tooltip arrow
                                             title='By clicking withdraw offer you will delete your offer for this quote.'
                                             classes={{tooltip: classes.customTooltip}}
                                    >
                                        <RejectButton type={'button'} onClick={props.withdrawOfferHandler}>WITHDRAW
                                            OFFER</RejectButton>
                                    </Tooltip>
                                </ActionsAgentWrap>
                            }
                        </CardHeader>
                        <QuoteInfo>
                            <GeneralInfo>
                                <GeneralTitle>GENERAL INFO</GeneralTitle>
                                <GeneralInfoContent>
                                    <ShipmentType>
                                        <img src={props.exact_quote_info?.shipping_type === 'sea' ? sea_type : air_type}
                                             alt=""/>
                                    </ShipmentType>
                                    <Content>
                                        <ContentRow>
                                            <RowTitle>SHIPPING MODE</RowTitle>
                                            <RowValue>{props.exact_quote_info?.shipping_mode.title}</RowValue>
                                        </ContentRow>
                                        <ContentRow>
                                            <RowTitle>ORIGIN</RowTitle>
                                            <RowValue>{props.exact_quote_info?.origin.display_name}</RowValue>
                                        </ContentRow>
                                        <ContentRow>
                                            <RowTitle>DESTINATION</RowTitle>
                                            <RowValue>{props.exact_quote_info?.destination.display_name}</RowValue>
                                        </ContentRow>
                                    </Content>
                                </GeneralInfoContent>
                            </GeneralInfo>
                            <ShipmentInfo>
                                <GeneralTitle>SHIPMENT INFO</GeneralTitle>
                                <GeneralInfoContent>
                                    <ShipmentType margin_right='15.68px'>
                                        <img src={dates_icon} alt=""/>
                                    </ShipmentType>
                                    <ShipmentRow>
                                        <ShipmentRowTitle>SHIPMENT DATE</ShipmentRowTitle>
                                        <ShipmentRowWeek>
                                            {(props.exact_quote_info?.week_range.week_from !== props.exact_quote_info?.week_range.week_to)
                                                ? `WEEK ${props.exact_quote_info?.week_range.week_from} - ${props.exact_quote_info?.week_range.week_to}`
                                                : `WEEK ${props.exact_quote_info?.week_range.week_from}`
                                            }
                                        </ShipmentRowWeek>
                                        <RowValue>{day_from}{'-'}{date_to}</RowValue>
                                    </ShipmentRow>
                                </GeneralInfoContent>
                            </ShipmentInfo>
                        </QuoteInfo>
                        <CargoInfo>
                            <GeneralTitle>CARGO</GeneralTitle>
                            <CargoShippingModeWrap>
                                {props.exact_quote_info?.shipping_mode.title}
                            </CargoShippingModeWrap>
                            <CargoContentWrapper>
                                <CargoTable cargos={props.exact_quote_info?.cargo_groups}/>
                            </CargoContentWrapper>
                        </CargoInfo>
                        {!props.exact_quote_info?.is_submitted
                            ? <>
                                <CarrierInfo>
                                    <CarrierWrap>
                                        <GeneralTitle>CARRIER</GeneralTitle>
                                        <Controller control={control}
                                                    name='carrier'
                                                    defaultValue={''}
                                                    as={
                                                        <SurchargeRateSelect error={errors?.carrier?.message}
                                                                             maxW='430px'
                                                                             placeholder='Carrier company name'
                                                                             options={props.carrier_list}
                                                        />
                                                    }
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                        />
                                    </CarrierWrap>
                                    {props.existing_rate_for_quote && <CarrierWrap>
                                        <GeneralTitle>FREIGHT RATES</GeneralTitle>
                                        <FrateRatesTable rate={props.existing_rate_for_quote}
                                        />
                                    </CarrierWrap>}
                                </CarrierInfo>
                                <SurchargesInfo no_rates={props.existing_rate_for_quote}>
                                    {props.checked_surcharge_result && !props.existing_rate_for_quote &&
                                    <NoRateSurchargeCard openCreatePopup={props.openCreatePopup}/>}
                                    {props.existing_rate_for_quote && props.existing_surcharge_for_quote
                                    && <AgentSurchargesTable
                                        surcharges={props.existing_surcharge_for_quote ? props.existing_surcharge_for_quote : null}
                                    />
                                    }
                                </SurchargesInfo>
                            </>
                            : <TotalCostCalculationContainer
                                calculation={props.exact_quote_info?.status?.charges ? props.exact_quote_info.status?.charges : null}
                            />
                        }

                    </QuoteCardInner>
                </QuoteCardWrapperForm>
            }
        </Layout>
    )
}

export default QuoteCard