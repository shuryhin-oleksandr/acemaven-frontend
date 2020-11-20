import React, {useEffect, useState} from 'react'
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
import {useHistory, withRouter} from 'react-router-dom';
//moment js
import moment from "moment";
//BLL
import {
    getBadSavingMessageSelector,
    getCheckRateResult,
    getExactQuoteInfoSelector,
    getExistingRateForQuoteSelector,
    getExistingSurchargeForQuoteSelector,
    getFindedFirst,
    saveRateResultSelector
} from "../../../../_BLL/selectors/quotes/agent/agentQuoteSelector";
import {
    getExactQuoteThunk,
    getExistingRatesForQuoteThunk,
    rejectQuoteThunk,
    submitQuoteThunk,
    withdrawOfferThunk
} from "../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {quotesAgentActions} from "../../../../_BLL/reducers/quotes/quotesAgentReducer";
import {getCarriers} from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {
    getAirCarriersSelector,
    getSeaCarriersSelector
} from "../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
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
    QuoteCardContainer,
    QuoteCardInner,
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
import TotalCostCalculationContainer from "./table/TotalCostCalculationContainer";
import {Tooltip} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";


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

const QuoteCard = ({...props}) => {

    const classes = useStyles();

    const {control, errors, handleSubmit, watch} = useForm({
        reValidateMode: "onBlur"
    })
    const onSubmit = () => {
        dispatch(submitQuoteThunk(Number(exact_quote_info?.id), Number(existing_rate_for_quote?.id), history))
    }

    const history = useHistory()
    let carrier_field = watch('carrier')

    //data from store
    const exact_quote_info = useSelector(getExactQuoteInfoSelector)
    const sea_carrier_list = useSelector(getSeaCarriersSelector)
    const air_carrier_list = useSelector(getAirCarriersSelector)
    const existing_rate_for_quote = useSelector(getExistingRateForQuoteSelector)
    const existing_surcharge_for_quote = useSelector(getExistingSurchargeForQuoteSelector)
    const checked_rate_result = useSelector(getCheckRateResult)
    const save_rate_result = useSelector(saveRateResultSelector)
    const bad_saving_message = useSelector(getBadSavingMessageSelector)
    const finded_first = useSelector(getFindedFirst)

    //local state
    const [isCreatePopup, openCreatePopup] = useState(false)
    let id = props.match.params.id;
    const [isTemporaryPopup, setIsTemporaryPopup] = useState(false)

    //delete current quote info from store
    let unmountHandler = () => {
        dispatch(quotesAgentActions.setExactQuoteInfo(null))
        dispatch(quotesAgentActions.setCheckedIsRateExist(''))
        dispatch(quotesAgentActions.setExistingRateForQuote(null))
        dispatch(quotesAgentActions.setExistingSurchargeForQuote(null))
    }

    const rejectQuoteHandler = () => {
        dispatch(rejectQuoteThunk(Number(exact_quote_info?.id), history))
    }
    const withdrawOfferHandler = () => {
        dispatch(withdrawOfferThunk(Number(exact_quote_info?.id), history))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getExactQuoteThunk(id))
        dispatch(getCarriers())
        return () => {
            unmountHandler()
        }
    }, [dispatch])

    let quote_data = {
        shipping_mode: Number(exact_quote_info?.shipping_mode.id),
        origin: Number(exact_quote_info?.origin.id),
        destination: Number(exact_quote_info?.destination.id),
        carrier: carrier_field,
        cargo_groups: exact_quote_info?.cargo_groups
            ? exact_quote_info?.cargo_groups.map(c => (c.container_type
                ? {...c, container_type: Number(c.container_type?.id)}
                : {...c, packaging_type: Number(c.packaging_type?.id)}))
            : [],
        date_from: String(exact_quote_info?.date_from),
        date_to: String(exact_quote_info?.date_to)
    }
   useEffect(() => {
        if(carrier_field) {
            dispatch(quotesAgentActions.setExistingRateForQuote(null))
            // @ts-ignore
            dispatch(getExistingRatesForQuoteThunk(quote_data))
        }
    }, [carrier_field])

    useEffect(() => {
        if(existing_rate_for_quote && !finded_first) {
            setIsTemporaryPopup(true)
        }
    }, [existing_rate_for_quote, finded_first])

    //refactoring dates
    let a = moment(exact_quote_info?.date_from, 'DD/MM/YYYY').toDate()
    let day_from = moment(a).format('DD/MM')
    let c = moment(exact_quote_info?.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('DD/MM')


    useEffect(() => {
         if(existing_rate_for_quote && finded_first) {
            let s = existing_rate_for_quote?.rates?.map(f => {
                 return f?.surcharges?.find((s: any) => s !== null)
            })
            s && dispatch(quotesAgentActions.setExistingSurchargeForQuote(s[0]))
         }
     }, [existing_rate_for_quote, finded_first])




    return (
        <Layout>
            {isTemporaryPopup && <SaveTemporaryQuotePopup closePopup={setIsTemporaryPopup}
                                                          freight={existing_rate_for_quote}
                                                          saveRateResult={save_rate_result}
                                                          bad_saving_message={bad_saving_message}
            />}
            {isCreatePopup && <RegisterNewRateFromQuotePopup openCreatePopup={openCreatePopup}
                                                             setIsTemporaryPopup={setIsTemporaryPopup}
                                                             carrier_field={carrier_field}
                                                             quote={exact_quote_info}
                                                             sea_carriers={sea_carrier_list ? sea_carrier_list : []}
                                                             air_carriers={air_carrier_list ? air_carrier_list : []}
                                                             existing_rate_for_quote={existing_rate_for_quote}
                                                             save_rate_result={save_rate_result}
            />}
            <QuoteCardContainer onSubmit={handleSubmit(onSubmit)}>
                <QuoteCardInner>
                    <CardHeader>
                        <CardTitle>Quotes</CardTitle>
                        {!exact_quote_info?.is_submitted
                            ? <ActionsAgentWrap>
                                <QuoteOpenStatus>Open</QuoteOpenStatus>
                                <SubmitQuoteButton disabled={!existing_rate_for_quote} type={'submit'}>SUBMIT QUOTE</SubmitQuoteButton>
                                <Tooltip arrow
                                         title='By clicking reject you will delete this quote from your list.'
                                         classes={{ tooltip: classes.customTooltip }}
                                >
                                    <RejectButton onClick={rejectQuoteHandler} type={'button'}>REJECT</RejectButton>
                                </Tooltip>
                            </ActionsAgentWrap>
                            : <ActionsAgentWrap>
                                <QuoteOpenStatus>Offer submitted</QuoteOpenStatus>
                                <Tooltip arrow
                                         title='By clicking withdraw offer you will delete your offer for this quote.'
                                         classes={{ tooltip: classes.customTooltip }}
                                >
                                <RejectButton type={'button'} onClick={withdrawOfferHandler}>WITHDRAW OFFER</RejectButton>
                                </Tooltip>
                            </ActionsAgentWrap>
                        }
                    </CardHeader>
                    <QuoteInfo>
                        <GeneralInfo>
                            <GeneralTitle>GENERAL INFO</GeneralTitle>
                            <GeneralInfoContent>
                                <ShipmentType>
                                    <img src={exact_quote_info?.shipping_type === 'sea' ? sea_type : air_type} alt=""/>
                                </ShipmentType>
                                <Content>
                                    <ContentRow>
                                        <RowTitle>SHIPPING MODE</RowTitle>
                                        <RowValue>{exact_quote_info?.shipping_mode.title}</RowValue>
                                    </ContentRow>
                                    <ContentRow>
                                        <RowTitle>ORIGIN</RowTitle>
                                        <RowValue>{exact_quote_info?.origin.display_name}</RowValue>
                                    </ContentRow>
                                    <ContentRow>
                                        <RowTitle>DESTINATION</RowTitle>
                                        <RowValue>{exact_quote_info?.destination.display_name}</RowValue>
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
                                        {(exact_quote_info?.week_range.week_from !== exact_quote_info?.week_range.week_to)
                                            ? `WEEK ${exact_quote_info?.week_range.week_from} - ${exact_quote_info?.week_range.week_to}`
                                            : `WEEK ${exact_quote_info?.week_range.week_from}`
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
                            {exact_quote_info?.shipping_mode.title}
                        </CargoShippingModeWrap>
                        <CargoContentWrapper>
                            <CargoTable cargos={exact_quote_info?.cargo_groups}/>
                        </CargoContentWrapper>
                    </CargoInfo>
                    {!exact_quote_info?.is_submitted
                        ? <>
                            <CarrierInfo>
                                <CarrierWrap>
                                    <GeneralTitle>CARRIER</GeneralTitle>
                                    <Controller control={control}
                                                name='carrier'
                                                defaultValue={''}
                                                as={
                                                    <SurchargeRateSelect error={errors?.carrier?.message}
                                                                         maxW='500px'
                                                                         placeholder='Carrier company name'
                                                                         options={exact_quote_info?.shipping_type === 'sea' ? sea_carrier_list : air_carrier_list}
                                                    />
                                                }
                                                rules={{
                                                    required: 'Field is required'
                                                }}
                                    />
                                </CarrierWrap>
                                {existing_rate_for_quote && <CarrierWrap>
                                    <GeneralTitle>FREIGHT RATES</GeneralTitle>
                                    <FrateRatesTable rate={existing_rate_for_quote}
                                    />
                                </CarrierWrap>}
                            </CarrierInfo>
                            <SurchargesInfo no_rates={existing_rate_for_quote}>
                                {!existing_rate_for_quote && checked_rate_result && <NoRateSurchargeCard openCreatePopup={openCreatePopup}/>}
                                {existing_rate_for_quote && existing_surcharge_for_quote && checked_rate_result
                                && <AgentSurchargesTable surcharges={existing_surcharge_for_quote ? existing_surcharge_for_quote : null}
                                />
                                }
                            </SurchargesInfo>
                        </>
                        : <TotalCostCalculationContainer calculation={exact_quote_info.status?.charges ? exact_quote_info.status?.charges : null}/>
                    }

                </QuoteCardInner>
            </QuoteCardContainer>
        </Layout>
    )
}

export default withRouter(QuoteCard)