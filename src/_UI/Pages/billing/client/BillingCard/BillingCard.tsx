import React from "react";
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
  Row, ToBookText,
} from "./billing-card-styles";

const BillingCard: React.FC = () => {
  return (
    <CardContainer>
      <BillingMapComponent
        isMarkerShown
        loadingElement={<div />}
        containerElement={<MapWrapper />}
        mapElement={<div style={{ height: "226px" }} />}
      />
      <InformationWrapper>
        <Route>
          <img src={plane_surcharge} alt="" />
          <div>usmia — brrsszz</div>
        </Route>
        <MainInfo>
          <Row>
            <InfoTitle>ACID</InfoTitle>
            <InfoText>AE1025578</InfoText>
          </Row>
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
            <ToBookText>to Book:</ToBookText>
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
      </InformationWrapper>
    </CardContainer>
  );
};

export default BillingCard;
//
