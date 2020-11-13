import React, {useState} from 'react'
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//components
import CargoTable from "./CargoTable";
import FormSelect from "../../../components/_commonComponents/select/FormSelect";
import FrateRatesTable from "./table/FrateRatesTable";
import Layout from "../../../components/BaseLayout/Layout";
import NoRateSurchargeCard from "./NoRateSurchargeCard";
import RegisterNewRateFromQuotePopup from "../../../components/PopUps/register_new_rate_from_quote/RegisterNewRateFromQuotePopup";
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
import dates_icon from '../../../../_UI/assets/icons/date_1.svg'
import AgentSurchargesTable from "./table/surcharge/AgentSurchargesTable";

type PropsType = {

}

const QuoteCard:React.FC<PropsType> = () => {
    const {control, errors, handleSubmit, setValue} = useForm({
        reValidateMode: "onBlur"
    })
    let no_rates = false

    const [isCreatePopup, openCreatePopup] = useState(false)

    return (
        <Layout>
            {isCreatePopup && <RegisterNewRateFromQuotePopup openCreatePopup={openCreatePopup}/>}
            <QuoteCardContainer>
                <QuoteCardInner>
                    <CardHeader>
                        <CardTitle>Quotes</CardTitle>
                        <ActionsAgentWrap>
                            <QuoteOpenStatus>Open</QuoteOpenStatus>
                            <SubmitQuoteButton>SUBMIT QUOTE</SubmitQuoteButton>
                            <RejectButton onClick={() => {}}>REJECT</RejectButton>
                        </ActionsAgentWrap>
                    </CardHeader>
                    <QuoteInfo>
                        <GeneralInfo>
                            <GeneralTitle>GENERAL INFO</GeneralTitle>
                            <GeneralInfoContent>
                                <ShipmentType>
                                    <img src={sea_type} alt=""/>
                                </ShipmentType>
                                <Content>
                                    <ContentRow>
                                        <RowTitle>SHIPPING MODE</RowTitle>
                                        <RowValue>Loose Cargo</RowValue>
                                    </ContentRow>
                                    <ContentRow>
                                        <RowTitle>ORIGIN</RowTitle>
                                        <RowValue>Barcelona</RowValue>
                                    </ContentRow>
                                    <ContentRow>
                                        <RowTitle>DESTINATION</RowTitle>
                                        <RowValue>London</RowValue>
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
                                    <ShipmentRowWeek>WEEK 24</ShipmentRowWeek>
                                    <RowValue>01/11 - 07/11</RowValue>
                                </ShipmentRow>
                            </GeneralInfoContent>
                        </ShipmentInfo>
                    </QuoteInfo>
                    <CargoInfo>
                        <GeneralTitle>CARGO</GeneralTitle>
                        <CargoShippingModeWrap>
                            Loose Cargo
                        </CargoShippingModeWrap>
                        <CargoContentWrapper>
                            <CargoTable />
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

export default QuoteCard