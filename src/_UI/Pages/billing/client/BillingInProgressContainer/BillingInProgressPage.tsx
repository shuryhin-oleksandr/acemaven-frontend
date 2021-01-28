import React, { useState } from "react";
import MapComponent from "../../../dashboard/MapComponent/MapComponent";
import { MapWrapper } from "../../../dashboard/dashboard-styles";
import { HideButton } from "../../../operations/agent/agent-operations-list-container";
import hide_map_icon from "../../../../assets/icons/operations/hide_map.svg";
import { Content, Inner, Wrapper, Heading } from "./billing-in-progress-styles";
import BillingInProgressCard from "./BillingInProgressCard";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {
  autoTrackWithEventsHelper,
  manualTrackWithEventsHelper
} from "../../../../../_BLL/helpers/tracker/autoTracksWithEventsHelper";

type PropsType = {
  billing_list: BillingOperationType[];
};

const BillingInProgressPage: React.FC<PropsType> = ({ billing_list }) => {
  const [isHide, setIsHide] = useState(false);

  //for map (polyline & shipment-icon current position)
 /* let auto_events = autoTrackWithEventsHelper(props.operations_list)
  let manual_events = manualTrackWithEventsHelper(props.operations_list)

  const events = [...auto_events, ...manual_events]*/
    let events = autoTrackWithEventsHelper(billing_list);
  return (
    <Wrapper>
      {!isHide && (
        <MapComponent
          isMarkerShown
          loadingElement={<div style={{ height: `450px` }} />}
          containerElement={<MapWrapper />}
          mapElement={<div style={{ height: `450px` }} />}
          events={events}
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
            {billing_list.map((i) => (
              <BillingInProgressCard billing={i} key={i.id} />
            ))}
          </ScrollbarStyled>
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default BillingInProgressPage;
