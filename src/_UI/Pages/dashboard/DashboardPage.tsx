import React, { useState } from "react";
import {
  WidgetButton,
  DashboardWrapper,
  SearchBox,
  MultiWidgetBox,
  ButtonBox,
  MapWrapper,
} from "./dashboard-styles";
import Search from "./Widgets/SearchWidget/Search";
import FeePaymentWidget from "./Widgets/FeePaymentWidget/FeePaymentWidget";
import LatestQuotesWidget from "./Widgets/LatestQoutesWidget/LatestQuotesWidget";
import RackingStatusWidget from "./Widgets/RackingStatusWidget/RackingStatusWidget";
import MapComponent from "./MapComponent/MapComponent";
import {CurrentShippingType} from "../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {CargoGroupType} from "../../../_BLL/types/search/search_types";
import { PackagingType} from "../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
    setOpenCalcPopup: (value: boolean) => void,
    shippingValue: number,
    setShippingValue: (value: number) => void,
    setMode: (value: CurrentShippingType) => void
    mode: CurrentShippingType,
    cargo_groups: CargoGroupType[] | null,
    packaging_types: PackagingType[] | null,
}

const DashboardPage: React.FC<PropsType> = ({setOpenCalcPopup, shippingValue, setShippingValue, mode, setMode,
                                                cargo_groups, packaging_types, }) => {
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
            {/*<SearchWidget right="162px" />*/}
            {/*<Search setOpenCalcPopup={setOpenCalcPopup}*/}
            {/*        shippingValue={shippingValue}*/}
            {/*        setShippingValue={setShippingValue}*/}
            {/*        mode={mode}*/}
            {/*        setMode={setMode}*/}
            {/*        cargo_groups={cargo_groups}*/}
            {/*        packaging_types={packaging_types}*/}
            {/*/>*/}
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
