import React, { useState } from "react";
import MapComponent from "../../../dashboard/MapComponent/MapComponent";
import { MapWrapper } from "../../../dashboard/dashboard-styles";
import { HideButton } from "../../../operations/agent/agent-operations-list-container";
import hide_map_icon from "../../../../assets/icons/operations/hide_map.svg";
import {
  CardsWrapper,
  Content,
  Inner,
  Wrapper,
  Heading,
} from "./billing-in-progress-styles";
import BillingInProgressCard from "./BillingInProgressCard";

const BillingInProgressPage: React.FC = () => {
  const [isHide, setIsHide] = useState(false);
  return (
    <Wrapper>
      {!isHide && (
        <MapComponent
          isMarkerShown
          loadingElement={<div style={{ height: `350px` }} />}
          containerElement={<MapWrapper />}
          mapElement={<div style={{ height: `350px` }} />}
        />
      )}
      <Inner>
        <HideButton
          isHide={isHide}
          onClick={() => (isHide ? setIsHide(false) : setIsHide(true))}
        >
          <img src={hide_map_icon} alt="" />
        </HideButton>
        <Content isHide={isHide}>
          <Heading>Operations in Progress</Heading>
          <CardsWrapper>
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
          </CardsWrapper>
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default BillingInProgressPage;
