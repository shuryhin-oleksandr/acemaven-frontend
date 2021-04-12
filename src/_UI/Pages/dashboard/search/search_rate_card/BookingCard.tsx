import React from "react";
//REACT-REDUX
import { useDispatch } from "react-redux";
//types
import { QuoteType } from "../../../../../_BLL/types/quotes/quotesTypes";
//BLL
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";
//COMPONENTS
import RatingPartContainer from "./RatingPartContainer";
//styles
import {
  AdditionalWrap,
  BookButton,
  CalcName,
  CalculationLine,
  CalculationWrap,
  CalcValue,
  Carrier,
  DateLine,
  DateName,
  DateValue,
  Direction,
  DirectionWrap,
  GeneralPart,
  GeneralWrap,
  InfoPart,
  ShippingType,
  TotalPart,
  UpperWrapper,
} from "./search-card-styles";
//icons
import ship from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../../assets/icons/rates&services/plane-surcharge.svg";

type PropsType = {
  button_display: boolean;
  showTable?: (value: boolean) => void;
  isTableShown?: boolean;
  showRatingPopup: (value: boolean) => void;
  setBookingPopupVisible?: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  search_result?: any; //SearchResultType
  quote?: QuoteType;
  setClickedReview?: (value: number) => void;
};

const BookingCard: React.FC<PropsType> = ({
  button_display,
  showTable,
  isTableShown,
  showRatingPopup,
  setBookingPopupVisible,
  search_result,
  setWidgetsVisible,
  ...props
}) => {
  const dispatch = useDispatch();
  return (
    <UpperWrapper
      onClick={() =>
        isTableShown
          ? showTable && showTable(false)
          : showTable && showTable(true)
      }
    >
      <InfoPart>
        <GeneralPart>
          <GeneralWrap>
            <ShippingType>
              <img
                src={
                  search_result?.freight_rate.shipping_type === "sea"
                    ? ship
                    : plane
                }
                alt=""
              />
            </ShippingType>
            <DirectionWrap>
              <Direction>
                {search_result?.freight_rate.origin.display_name} -{" "}
                {search_result?.freight_rate.destination.display_name}
              </Direction>
              {search_result?.freight_rate.carrier !== "disclosed" && (
                <Carrier>*{search_result?.freight_rate.carrier}</Carrier>
              )}
            </DirectionWrap>
          </GeneralWrap>
          <AdditionalWrap>
            <DateLine>
              <DateName>Transit time</DateName>
              <DateValue>
                {search_result?.freight_rate.transit_time} days
              </DateValue>
            </DateLine>
            <DateLine>
              <DateName>Rate Expiration Date:</DateName>
              <DateValue>
                {search_result?.freight_rate.expiration_date}
              </DateValue>
            </DateLine>
          </AdditionalWrap>
        </GeneralPart>
        {!!search_result?.freight_rate.company?.name && (
          <RatingPartContainer
            showRatingPopup={showRatingPopup}
            company={search_result?.freight_rate.company}
            setClickedReview={props.setClickedReview}
          />
        )}
      </InfoPart>
      <TotalPart>
        <CalculationWrap>
          {search_result?.cargo_groups.map((c: any, index: any) => (
            <CalculationLine key={index} marginBottom="10px">
              <CalcName>Freight x {c.cargo_type} in:</CalcName>
              <CalcValue>
                {c.freight.currency} {c.freight.subtotal}
              </CalcValue>
            </CalculationLine>
          ))}

          {Object.keys(search_result?.total_freight_rate).map(
            (key) =>
              !!search_result?.total_freight_rate[key] && (
                <CalculationLine>
                  <CalcName>Total Freight in:</CalcName>
                  <CalcValue>
                    {key} {search_result?.total_freight_rate[key]}
                  </CalcValue>
                </CalculationLine>
              )
          )}
          {Object.keys(search_result?.total_surcharge).map(
            (key) =>
              !!search_result?.total_surcharge[key] && (
                <CalculationLine>
                  <CalcName>Surcharges in:</CalcName>
                  <CalcValue>
                    {key} {search_result?.total_surcharge[key]}
                  </CalcValue>
                </CalculationLine>
              )
          )}
          {search_result?.service_fee && (
            <CalculationLine>
              <CalcName>Acemaven Service Fee:</CalcName>
              <CalcValue>
                {search_result?.service_fee?.currency}{" "}
                {search_result?.service_fee?.subtotal}
              </CalcValue>
            </CalculationLine>
          )}
        </CalculationWrap>
        <BookButton
          onClick={(e) => {
            e.stopPropagation();
            search_result &&
              dispatch(
                bookingActions.set_current_booking_freight_rate_id(
                  search_result.freight_rate.id
                )
              );
            search_result &&
              dispatch(
                bookingActions.set_current_booking_freight_rate(search_result)
              );
            //search_result && dispatch(bookingActions.set_current_booking_cargo_groups(search_result.cargo_groups))
            setBookingPopupVisible && setBookingPopupVisible(true);
            setWidgetsVisible && setWidgetsVisible(false);
          }}
          button_display={button_display}
        >
          BOOK
        </BookButton>
      </TotalPart>
    </UpperWrapper>
  );
};

export default BookingCard;
