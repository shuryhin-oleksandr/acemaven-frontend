import React from "react";
import {
  BillingCardContainer,
  InfoText,
  InfoTitle,
  Route,
  RouteText,
  ChargeRow,
  ChargesBlock,
  ChargeTitle,
  ChargeValue,
  MainInfo,
  Row,
  DueToText,
} from "./billing-in-progress-styles";
import sea_type from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_type from "../../../../assets/icons/rates&services/plane-surcharge.svg";
const BillingInProgressCard: React.FC = () => {
  return (
    <BillingCardContainer>
      <Route>
        <img src={sea_type} alt="" />
        <div style={{ marginLeft: "9px" }}>
          <RouteText>usmia — brrsszz</RouteText>
          <InfoTitle>ACID</InfoTitle>
          <InfoText>AE1025578</InfoText>
        </div>
      </Route>
      <MainInfo>
        <Row>
          <InfoTitle>STATUS</InfoTitle>
          <InfoText>BOOKING FEE PANDING </InfoText>
        </Row>
        <Row>
          <InfoTitle>shipping mode</InfoTitle>
          <InfoText>Loose Cargo</InfoText>
        </Row>
        <Row>
          <InfoTitle>DATES</InfoTitle>
          <InfoText>ETD: 05/11, ETA:25/11</InfoText>
        </Row>
      </MainInfo>
      <ChargesBlock>
        <div style={{ width: "45%" }}>
          <ChargeRow>
            <ChargeTitle>CHARGES IN USD</ChargeTitle>
            <ChargeValue>8.020.00</ChargeValue>
          </ChargeRow>
          <ChargeRow>
            <ChargeTitle>CHARGES IN BRL</ChargeTitle>
            <ChargeValue>7100.00</ChargeValue>
          </ChargeRow>
        </div>
        <div style={{ width: "45%" }}>
          <DueToText>Due to 10th August 2020:</DueToText>
          <ChargeRow>
            <ChargeTitle>CHARGES IN USD</ChargeTitle>
            <ChargeValue>8.020.00</ChargeValue>
          </ChargeRow>
          <ChargeRow>
            <ChargeTitle>CHARGES IN BRL</ChargeTitle>
            <ChargeValue>7100.00</ChargeValue>
          </ChargeRow>
        </div>
      </ChargesBlock>
    </BillingCardContainer>
  );
};

export default BillingInProgressCard;
