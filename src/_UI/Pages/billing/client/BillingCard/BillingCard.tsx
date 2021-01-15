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

type PropTypes = {
  actionButtons?: boolean;
  billing: BillingOperationType;
};

const BillingCard: React.FC<PropTypes> = ({ actionButtons, billing }) => {
  return (
    <CardContainer>
      <BillingMapComponent
        isMarkerShown
        loadingElement={<div />}
        containerElement={<MapWrapper />}
        mapElement={<div style={{ height: "233px" }} />}
      />
      <InformationWrapper>
        <Row style={{ justifyContent: "space-between" }}>
          <Route>
            <img src={plane_surcharge} alt="" />
            <div>{`${billing.origin.code} - ${billing.destination.code}`}</div>
          </Route>
          {actionButtons && (
            <Row>
              <ConfirmButton
              // onClick={() => props.setClientChangRequestPopupVisible(true)}
              >
                PAY
              </ConfirmButton>
              <RejectButton>CANCEL</RejectButton>
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
            <ChargeRow>
              <ChargeTitle>CHARGES IN USD</ChargeTitle>
              <ChargeValue>{billing.charges.totals.USD}</ChargeValue>
            </ChargeRow>
            <ChargeRow>
              <ChargeTitle>CHARGES IN BRL</ChargeTitle>
              <ChargeValue>{billing.charges.totals.BRL}</ChargeValue>
            </ChargeRow>
          </div>
          <div style={{ width: "45%" }}>
            {billing.status !== "Operation Complete" && (
              <ToBookText>to Book:</ToBookText>
            )}
            <ChargeRow>
              <ChargeTitle>Acemaven Service Fee</ChargeTitle>
              <ChargeValue>
                {`${billing.charges.service_fee?.currency} ${billing.charges.service_fee?.cost}`}
              </ChargeValue>
            </ChargeRow>
            <ChargeRow>
              <ChargeTitle>Booking Fee</ChargeTitle>
              <ChargeValue>
                {`${billing.charges.pay_to_book?.currency} ${billing.charges.pay_to_book?.pay_to_book}`}
              </ChargeValue>
            </ChargeRow>
          </div>
        </ChargesBlock>
      </InformationWrapper>
    </CardContainer>
  );
};

export default BillingCard;
//
