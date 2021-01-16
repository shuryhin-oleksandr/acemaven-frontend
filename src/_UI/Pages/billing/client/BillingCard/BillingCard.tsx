import React from "react";
//icons
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import ship_surcharge from "../../../../assets/icons/rates&services/ship-surcharge.svg";

import BillingMapComponent from "./BillingMapComponent";
import {
  CardContainer,
  ChargeRow,
  ChargesBlock,
  ChargeTitle,
  ChargeValue,
  InformationWrapper,
  InfoText,
  InfoTitle,
  MainInfo,
  MapWrapper,
  Route,
  Row,
  ToBookText,
  ConfirmButton,
  RejectButton,
} from "./billing-card-styles";
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import SmallMapComponent from "../../../operations/agent/ExactOperationContainer/OperationCard/blocks/shipments_tracking_block/SmallMapComponent";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";

type PropTypes = {
  billing: BillingOperationType;
  cancelBooking?: (showPopup: boolean, id: number) => void;
};

const BillingCard: React.FC<PropTypes> = ({ billing, cancelBooking }) => {
  return (
    <CardContainer>
      <BillingMapComponent
        loadingElement={<div />}
        containerElement={<MapWrapper />}
        mapElement={<div style={{ height: "233px" }} />}
        origin_coordinates={billing.origin.coordinates}
        destination_coordinates={billing.destination.coordinates}
      />
      <InformationWrapper>
        <Row style={{ justifyContent: "space-between" }}>
          <Route>
            <img
              src={
                billing.shipping_type === ShippingTypesEnum.SEA
                  ? ship_surcharge
                  : plane_surcharge
              }
              alt=""
            />
            <div>{`${billing.origin.code} - ${billing.destination.code}`}</div>
          </Route>
          {billing.status !== "Operation Complete" && (
            <Row>
              <ConfirmButton
              // onClick={() => props.setClientChangRequestPopupVisible(true)}
              >
                PAY
              </ConfirmButton>
              <RejectButton
                onClick={() => {
                  cancelBooking && cancelBooking(true, billing.id);
                }}
              >
                CANCEL
              </RejectButton>
            </Row>
          )}
        </Row>
        <MainInfo>
          <Row>
            <InfoTitle>ACID</InfoTitle>
            <InfoText>{billing.aceid}</InfoText>
          </Row>
          <Row>
            <InfoTitle>STATUS</InfoTitle>
            <InfoText>{billing.status}</InfoText>
          </Row>
          <Row>
            <InfoTitle>shipping mode</InfoTitle>
            <InfoText>{billing.shipping_mode}</InfoText>
          </Row>
          {billing.dates && (
            <Row>
              <InfoTitle>DATES</InfoTitle>
              <InfoText>{billing.dates}</InfoText>
            </Row>
          )}
        </MainInfo>
        <ChargesBlock>
          <div style={{ width: "45%" }}>
            {!!billing.charges.totals.USD && (
              <ChargeRow>
                <ChargeTitle>CHARGES IN USD</ChargeTitle>
                <ChargeValue>{billing.charges.totals.USD}</ChargeValue>
              </ChargeRow>
            )}
            {!!billing.charges.totals.BRL && (
              <ChargeRow>
                <ChargeTitle>CHARGES IN BRL</ChargeTitle>
                <ChargeValue>{billing.charges.totals.BRL}</ChargeValue>
              </ChargeRow>
            )}
            {!!billing.charges.totals.EUR && (
              <ChargeRow>
                <ChargeTitle>CHARGES IN EUR</ChargeTitle>
                <ChargeValue>{billing.charges.totals.EUR}</ChargeValue>
              </ChargeRow>
            )}
          </div>
          {billing.status !== "Operation Complete" && (
            <div style={{ width: "45%", position: "relative" }}>
              <ToBookText>to Book:</ToBookText>
              <ChargeRow>
                <ChargeTitle>Acemaven Service Fee</ChargeTitle>
                <ChargeValue>
                  {`${billing.charges.pay_to_book?.currency} ${billing.charges.pay_to_book?.service_fee}`}
                </ChargeValue>
              </ChargeRow>
              <ChargeRow>
                <ChargeTitle>Booking Fee</ChargeTitle>
                <ChargeValue>
                  {`${billing.charges.pay_to_book?.currency} ${billing.charges.pay_to_book?.booking_fee}`}
                </ChargeValue>
              </ChargeRow>
            </div>
          )}
        </ChargesBlock>
      </InformationWrapper>
    </CardContainer>
  );
};

export default BillingCard;
//
