import React, { useState } from "react";
import {
  WidgetButton,
  DashboardWrapper,
  SearchBox,
  MultiWidgetBox,
  ButtonBox,
  MapWrapper,
} from "./dashboard-styles";
import SearchWidget from "./Widgets/SearchWidget/SearchWidget";
import Search from "./Widgets/SearchWidget/Search";
import FeePaymentWidget from "./Widgets/FeePaymentWidget/FeePaymentWidget";
import LatestQuotesWidget from "./Widgets/LatestQoutesWidget/LatestQuotesWidget";
import RackingStatusWidget from "./Widgets/RackingStatusWidget/RackingStatusWidget";
import MapComponent from "./MapComponent/MapComponent";
import ChargeableWeightPopup from "../../components/PopUps/chargable_weight/ChargeableWeightPopup";

const DashboardPage: React.FC = () => {
  const [widgetsVisible, setWidgetsVisible] = useState(true);

  return (
    <DashboardWrapper>
      <MapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfyjgjCgBPurRc7zaVTJNXPOAMRtbQWmo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<MapWrapper />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {widgetsVisible && (
        <>
          <SearchBox>
            <SearchWidget right="162px" />
            <Search />
          </SearchBox>
          <MultiWidgetBox>
            <FeePaymentWidget />
            <LatestQuotesWidget />
            <RackingStatusWidget />
          </MultiWidgetBox>
        </>
      )}
      <ButtonBox>
        <WidgetButton onClick={() => setWidgetsVisible(!widgetsVisible)}>
          {widgetsVisible ? "Hide widgets" : "Show widgets"}
        </WidgetButton>
      </ButtonBox>
    </DashboardWrapper>
  );
};

export default DashboardPage;
