import React, {useEffect, useState} from 'react'
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
//moment js
import moment from "moment";
//BLL
import {getExactQuoteInfoSelector} from "../../../../_BLL/selectors/quotes/agent/agentQuoteSelector";
import {getExactQuoteThunk} from "../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {quotesAgentActions} from "../../../../_BLL/reducers/quotes/quotesAgentReducer";
//components
import CargoTable from "./CargoTable";
import FormSelect from "../../../components/_commonComponents/select/FormSelect";
import FrateRatesTable from "./table/FrateRatesTable";
import Layout from "../../../components/BaseLayout/Layout";
import NoRateSurchargeCard from "./NoRateSurchargeCard";
import RegisterNewRateFromQuotePopup from "../../../components/PopUps/register_new_rate_from_quote/RegisterNewRateFromQuotePopup";
import AgentSurchargesTable from "./table/surcharge/AgentSurchargesTable";
//styles
import {
    ActionsAgentWrap,
    CardHeader,
    CardTitle, CargoContentWrapper, CargoInfo, CargoShippingModeWrap, CarrierInfo, CarrierWrap,
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
    SubmitQuoteButton, SurchargesInfo
} from "./table/agent-quotes-styles";
//icons
import sea_type from '../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import air_type from '../../../assets/icons/rates&services/plane-surcharge.svg'
import dates_icon from '../../../../_UI/assets/icons/date_1.svg'


const QuoteCard = ({...props}) => {
    const {control, errors, handleSubmit, setValue} = useForm({
        reValidateMode: "onBlur"
    })
    let no_rates = false

    //data from store
    const exact_quote_info = useSelector(getExactQuoteInfoSelector)

    //local state
    const [isCreatePopup, openCreatePopup] = useState(false)
    let id = props.match.params.id;

    //delete current quote info from store
    let unmountHandler = () => {
        dispatch(quotesAgentActions.setExactQuoteInfo(null))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getExactQuoteThunk(id))
        return () => {
            unmountHandler()
        }
    }, [dispatch])

    //refactoring dates
    let a = moment(exact_quote_info?.date_from, 'DD/MM/YYYY').toDate()
    let day_from = moment(a).format('DD/MM')
    let c = moment(exact_quote_info?.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('DD/MM')

    return (
        <Layout>
            {isCreatePopup && <RegisterNewRateFromQuotePopup openCreatePopup={openCreatePopup}/>}
            <QuoteCardContainer>
                <QuoteCardInner>
                    <CardHeader>
                        <CardTitle>Quotes</CardTitle>
                        {!exact_quote_info?.is_submitted
                            ? <ActionsAgentWrap>
                                <QuoteOpenStatus>Open</QuoteOpenStatus>
                                <SubmitQuoteButton>SUBMIT QUOTE</SubmitQuoteButton>
                                <RejectButton onClick={() => {}}>REJECT</RejectButton>
                            </ActionsAgentWrap>
                            : <ActionsAgentWrap>
                                <QuoteOpenStatus>Offer submitted</QuoteOpenStatus>
                                <RejectButton onClick={() => {}}>WITHDRAW OFFER</RejectButton>
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
                    <CarrierInfo>
                        <CarrierWrap>
                            <GeneralTitle>CARRIER</GeneralTitle>
                            <Controller control={control}
                                        name='carrier'
                                        as={
                                            <FormSelect error={errors?.carrier?.message}
                                                        maxW='500px'
                                                        placeholder='Carrier company name'
                                            />
                                        }
                                        rules={{
                                            required: 'Field is required'
                                        }}
                            />
                        </CarrierWrap>
                        {!no_rates && <CarrierWrap>
                            <GeneralTitle>FREIGHT RATES</GeneralTitle>
                            <FrateRatesTable control={control}/>
                        </CarrierWrap>}
                    </CarrierInfo>
                    <SurchargesInfo no_rates={no_rates}>
                    {no_rates
                       ? <NoRateSurchargeCard openCreatePopup={openCreatePopup}/>
                       : <AgentSurchargesTable />
                    }
                    </SurchargesInfo>
                </QuoteCardInner>
            </QuoteCardContainer>
        </Layout>
    )
}

export default withRouter(QuoteCard)