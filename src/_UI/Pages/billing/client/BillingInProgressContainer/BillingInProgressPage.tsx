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

type PropsType = {
  billing_list: BillingOperationType[];
};

const BillingInProgressPage: React.FC<PropsType> = ({ billing_list }) => {
  const [isHide, setIsHide] = useState(false);

  let operations_with_auto_tracking = billing_list.filter(
    (o) => o.tracking.length > 0 && o
  );

  let events = operations_with_auto_tracking.map((o) => ({
    ...o.tracking_initial,
    locations:
      o.shipping_type === ShippingTypesEnum.AIR
        ? o.tracking?.map((ot: any) =>
            ot?.data?.events.map((e: any) => ({
              lat: e.ecefLatitude,
              lng: e.ecefLongitude,
            }))
          )[0]
        : o.tracking?.map(
            (ot: any) =>
              ot?.data?.data.length > 0 &&
              ot.data.data.locations.filter(
                (l: any) =>
                  l && {
                    lat: l.lat,
                    lng: l.lng,
                  }
              )
          )[0],
  }));

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
