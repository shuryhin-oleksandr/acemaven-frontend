import React from 'react'
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
import sea_type from '../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import dates_icon from '../../../../_UI/assets/icons/date_1.svg'
import CargoTable from "./CargoTable";
import FormSelect from "../../../components/_commonComponents/select/FormSelect";
import {Controller, useForm} from "react-hook-form";
import FrateRatesTable from "./table/FrateRatesTable";
import Additional from "../../Services&Rates/surcharge/surcharges_page/surcharge/Additional";
import UsageFees from "../../Services&Rates/surcharge/register_new_surcharge/tables/UsageFees";


type PropsType = {
    setCardOpen: (value: boolean) => void
}

const QuoteCard:React.FC<PropsType> = ({setCardOpen}) => {
    const {control, errors, handleSubmit, setValue} = useForm({
        reValidateMode: "onBlur"
    })

    return (
        <QuoteCardContainer>
            <QuoteCardInner>
                <CardHeader>
                    <CardTitle>Quotes</CardTitle>
                    <ActionsAgentWrap>
                        <QuoteOpenStatus>Open</QuoteOpenStatus>
                        <SubmitQuoteButton>SUBMIT QUOTE</SubmitQuoteButton>
                        <RejectButton onClick={() => setCardOpen(false)}>REJECT</RejectButton>
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
                    <CarrierWrap>
                        <GeneralTitle>CARRIER</GeneralTitle>
                        <FrateRatesTable control={control}/>
                    </CarrierWrap>
                </CarrierInfo>
                <SurchargesInfo>
                    <div style={{width: '50%'}}>
                    <UsageFees control={control}
                               usageFees={null}
                               tableName={'HANDLING'}
                               type='CONTAINER TYPE'
                               setValue={setValue}
                    />
                    </div>
                    <div style={{width: '50%'}}>
                        <Additional control={control}
                                    errors={errors}
                                    setValue={setValue}
                        />
                    </div>
                </SurchargesInfo>
            </QuoteCardInner>
        </QuoteCardContainer>
    )
}

export default QuoteCard