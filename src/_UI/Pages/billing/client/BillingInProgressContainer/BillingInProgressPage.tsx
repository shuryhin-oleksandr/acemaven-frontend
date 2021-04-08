import React, { useState } from "react";
//helpers
import {
  autoTrackWithEventsHelper,
  manualTrackWithEventsHelper
} from "../../../../../_BLL/helpers/tracker/autoTracksWithEventsHelper";
//types
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import MapComponent from "../../../dashboard/MapComponent/MapComponent";
import { HideButton } from "../../../operations/agent/agent-operations-list-container";
import BillingInProgressCard from "./BillingInProgressCard";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import NoQuotesCard from "../../../quotes/NoQuotesCard";
//styles
import { MapWrapper } from "../../../dashboard/dashboard-styles";
import { Content, Inner, Wrapper, Heading } from "./billing-in-progress-styles";
//icons
import hide_map_icon from "../../../../assets/icons/operations/hide_map.svg";
import {useTranslation} from "react-i18next";



type PropsType = {
  billing_list: BillingOperationType[];
};


const BillingInProgressPage: React.FC<PropsType> = ({ billing_list }) => {
  const [isHide, setIsHide] = useState(false);

  //for map (polyline & shipment-icon current position)
  let auto_events = autoTrackWithEventsHelper(billing_list)
  let manual_events = manualTrackWithEventsHelper(billing_list)

  const events = [...auto_events, ...manual_events]
  const {t} = useTranslation();
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
          <Heading>{t("Dashboard/Operations in progress")}</Heading>
          <ScrollbarStyled {...{ style: { height: "100%" } }}>
            {billing_list.length > 0 ? (
              billing_list.map((i) => (
                <BillingInProgressCard billing={i} key={i.id} />
              ))
            ) : (
              <NoQuotesCard text={t("Dashboard/There are no operations in progress.")} />
            )}
          </ScrollbarStyled>
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default BillingInProgressPage;
