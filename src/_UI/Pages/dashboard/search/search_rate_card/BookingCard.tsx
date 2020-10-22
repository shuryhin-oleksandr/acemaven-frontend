import React from 'react'
import {
    AdditionalWrap, BookButton, CalcName, CalculationLine, CalculationWrap, CalcValue,
    Carrier, CompanyName, DateLine, DateName, DateValue,
    Direction,
    DirectionWrap,
    GeneralPart,
    GeneralWrap,
    InfoPart, RatingPart, RatingWrap,
    ShippingType, TotalPart, UpperWrapper
} from "./search-card-styles";
import ship from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import blue_fill_star from "../../../../assets/icons/search/filled_star.svg";
import blue_part_fill_star from "../../../../assets/icons/search/part_filled_star.svg";
import blue_empty_star from "../../../../assets/icons/search/empty_star.svg";

type PropsType = {
    button_display: boolean
}

const BookingCard:React.FC<PropsType> = ({button_display}) => {
    return (
        <UpperWrapper>
            <InfoPart>
                <GeneralPart>
                    <GeneralWrap>
                        <ShippingType>
                            <img src={ship} alt=""/>
                        </ShippingType>
                        <DirectionWrap>
                            <Direction>Port of long</Direction>
                            <Carrier>*COSCO Shipping</Carrier>
                        </DirectionWrap>
                    </GeneralWrap>
                    <AdditionalWrap>
                        <DateLine>
                            <DateName>Transit time:</DateName>
                            <DateValue>22 days</DateValue>
                        </DateLine>
                        <DateLine>
                            <DateName>Rate Expiration Date:</DateName>
                            <DateValue>August 1st, 2020</DateValue>
                        </DateLine>
                    </AdditionalWrap>
                </GeneralPart>
                <RatingPart>
                    <CompanyName>TransferCo.</CompanyName>
                    <RatingWrap>
                        <img src={blue_fill_star} alt=""/>
                        <img src={blue_fill_star} alt=""/>
                        <img src={blue_fill_star} alt=""/>
                        <img src={blue_part_fill_star} alt=""/>
                        <img src={blue_empty_star} alt=""/>
                    </RatingWrap>
                </RatingPart>
            </InfoPart>
            <TotalPart>
                <CalculationWrap>
                    <CalculationLine>
                        <CalcName>Freight x 40HC:</CalcName>
                        <CalcValue>USD 1025</CalcValue>
                    </CalculationLine>
                    <CalculationLine marginBottom='10px'>
                        <CalcName>Freight x 20DV:</CalcName>
                        <CalcValue>USD 1025</CalcValue>
                    </CalculationLine>
                    <CalculationLine>
                        <CalcName>Total Freight:</CalcName>
                        <CalcValue>USD 1025</CalcValue>
                    </CalculationLine>
                    <CalculationLine>
                        <CalcName>Surcharges in:</CalcName>
                        <CalcValue>USD 240</CalcValue>
                    </CalculationLine>
                    <CalculationLine marginBottom='10px'>
                        <CalcName>Surcharges in:</CalcName>
                        <CalcValue>BRL 7100</CalcValue>
                    </CalculationLine>
                    <CalculationLine>
                        <CalcName>Acemaven Service Fee:</CalcName>
                        <CalcValue>BRL 50</CalcValue>
                    </CalculationLine>
                </CalculationWrap>
                <BookButton button_display={button_display}>
                    BOOK
                </BookButton>
            </TotalPart>
        </UpperWrapper>
    )
}

export default BookingCard