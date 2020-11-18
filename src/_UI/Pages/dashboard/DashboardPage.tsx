import React, { useState } from "react";
import {
  WidgetButton,
  DashboardWrapper,
  SearchBox,
  MultiWidgetBox,
  ButtonBox,
  MapWrapper,
} from "./dashboard-styles";
import FeePaymentWidget from "./Widgets/FeePaymentWidget/FeePaymentWidget";
import LatestQuotesWidget from "./Widgets/LatestQoutesWidget/LatestQuotesWidget";
import RackingStatusWidget from "./Widgets/RackingStatusWidget/RackingStatusWidget";
import MapComponent from "./MapComponent/MapComponent";

type PropsType = {
  setWidgetsVisible: any;
  widgetsVisible: boolean;
};

const DashboardPage: React.FC<PropsType> = ({
  setWidgetsVisible,
  widgetsVisible,
}) => {
  return (
    <DashboardWrapper>
      <MapComponent
        isMarkerShown
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<MapWrapper />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <MultiWidgetBox widgetsVisible={widgetsVisible}>
        <FeePaymentWidget />
        <LatestQuotesWidget />
        <RackingStatusWidget />
      </MultiWidgetBox>
      <ButtonBox>
        <WidgetButton onClick={() => setWidgetsVisible(!widgetsVisible)}>
          {widgetsVisible ? "Hide widgets" : "Show widgets"}
        </WidgetButton>
      </ButtonBox>
    </DashboardWrapper>
  );
};

export default DashboardPage;
