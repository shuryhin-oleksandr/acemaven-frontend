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
import plane from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import blue_fill_star from "../../../../assets/icons/search/filled_star.svg";
import blue_part_fill_star from "../../../../assets/icons/search/part_filled_star.svg";
import blue_empty_star from "../../../../assets/icons/search/empty_star.svg";
import {SearchResultType} from "../../../../../_BLL/types/search/search_types";

type PropsType = {
    button_display: boolean,
    showTable?: (value: boolean) => void,
    isTableShown?: boolean
    showRatingPopup?: (value: boolean) => void
    setBookingPopupVisible?: (value: boolean) => void,
    search_result?: SearchResultType
}

const BookingCard: React.FC<PropsType> = ({button_display, showTable, isTableShown, showRatingPopup, setBookingPopupVisible, search_result}) => {

    return (
        <UpperWrapper onClick={() => isTableShown ? showTable && showTable(false) : showTable && showTable(true)}>
            <InfoPart>
                <GeneralPart>
                    <GeneralWrap>
                        <ShippingType>
                            <img src={search_result?.freight_rate.shipping_type === 'sea' ? ship : plane} alt=""/>
                        </ShippingType>
                        <DirectionWrap>
                            <Direction>{search_result?.freight_rate.origin} - {search_result?.freight_rate.destination}</Direction>
                            <Carrier>*{search_result?.freight_rate.company}</Carrier>
                        </DirectionWrap>
                    </GeneralWrap>
                    <AdditionalWrap>
                        <DateLine>
                            <DateName>Transit time</DateName>
                            <DateValue>{search_result?.freight_rate.transit_time} days</DateValue>
                        </DateLine>
                        <DateLine>
                            <DateName>Rate Expiration Date:</DateName>
                            <DateValue>{search_result?.freight_rate.expiration_date}</DateValue>
                        </DateLine>
                    </AdditionalWrap>
                </GeneralPart>
                {/*<RatingPart onClick={() => showRatingPopup && showRatingPopup(true)}>
                    <CompanyName>TransferCo.</CompanyName>
                    <RatingWrap>
                        <img src={blue_fill_star} alt=""/>
                        <img src={blue_fill_star} alt=""/>
                        <img src={blue_fill_star} alt=""/>
                        <img src={blue_part_fill_star} alt=""/>
                        <img src={blue_empty_star} alt=""/>
                    </RatingWrap>
                </RatingPart>*/}
            </InfoPart>
            <TotalPart>
                <CalculationWrap>
                    {search_result?.cargo_groups.map(c => <CalculationLine marginBottom='10px'>
                        <CalcName>Freight x {c.cargo_type}:</CalcName>
                        <CalcValue>{c.freight.currency} {c.freight.subtotal}</CalcValue>
                    </CalculationLine>)}
                    <CalculationLine>
                        <CalcName>Total Freight in {search_result?.total_freight_rate.USD
                            ? "BRL"
                            : "USD" } :
                        </CalcName>
                        <CalcValue>
                            {search_result?.total_freight_rate.USD
                            ? search_result?.total_freight_rate.USD
                            : search_result?.total_freight_rate.BRL}
                        </CalcValue>
                    </CalculationLine>
                    <CalculationLine marginBottom='10px'>
                        <CalcName>
                            Surcharges in {search_result?.total_surcharge.BRL
                                ? "BRL"
                                : "USD"
                            } :
                        </CalcName>
                        <CalcValue>
                            {search_result?.total_surcharge.BRL
                                ? search_result?.total_surcharge.BRL
                                : search_result?.total_surcharge.USD
                            }
                        </CalcValue>
                    </CalculationLine>
                    <CalculationLine>
                        <CalcName>Acemaven Service Fee:</CalcName>
                        <CalcValue>{search_result?.service_fee.currency} {search_result?.service_fee.subtotal}</CalcValue>
                    </CalculationLine>
                </CalculationWrap>
                <BookButton onClick={(e) => {
                    e.stopPropagation();
                    setBookingPopupVisible && setBookingPopupVisible(true)
                }} button_display={button_display}>
                    BOOK
                </BookButton>
            </TotalPart>
        </UpperWrapper>
    )
}

export default BookingCard