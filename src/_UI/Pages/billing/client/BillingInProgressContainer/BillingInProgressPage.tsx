import React, { useState } from "react";
import MapComponent from "../../../dashboard/MapComponent/MapComponent";
import { MapWrapper } from "../../../dashboard/dashboard-styles";
import { HideButton } from "../../../operations/agent/agent-operations-list-container";
import hide_map_icon from "../../../../assets/icons/operations/hide_map.svg";
import {
  Content,
  Inner,
  Wrapper,
  Heading,
} from "./billing-in-progress-styles";
import BillingInProgressCard from "./BillingInProgressCard";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";

const BillingInProgressPage: React.FC = () => {
  const [isHide, setIsHide] = useState(false);
  return (
    <Wrapper>
      {!isHide && (
        <MapComponent
          isMarkerShown
          loadingElement={<div style={{ height: `450px` }} />}
          containerElement={<MapWrapper />}
          mapElement={<div style={{ height: `450px` }} />}
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
          <ScrollbarStyled {...{ style: { height: "100%" } }}>
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
            <BillingInProgressCard />
          </ScrollbarStyled>
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default BillingInProgressPage;
