import React, { useState } from "react";
import {
  WidgetButton,
  DashboardWrapper,
  SearchBox,
  MultiWidgetBox,
  ButtonBox,
  MapWrapper,
  Back,
} from "./dashboard-styles";
import FeePaymentWidget from "./Widgets/FeePaymentWidget/FeePaymentWidget";
import LatestQuotesWidget from "./Widgets/LatestQoutesWidget/LatestQuotesWidget";
import RackingStatusWidget from "./Widgets/RackingStatusWidget/RackingStatusWidget";
import MapComponent from "./MapComponent/MapComponent";
import SearchContainer from "./search/SearchContainer";
import {
  CargoGroupType,
  ChoiceType,
  SearchResultType,
} from "../../../_BLL/types/search/search_types";
import Search from "./Widgets/SearchWidget/Search";
import {
  ContainerType,
  PortType,
  ShippingTypeType,
} from "../../../_BLL/types/rates&surcharges/ratesTypes";
import { CurrentShippingType } from "../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { PackagingType } from "../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
  setWidgetsVisible: any;
  widgetsVisible: boolean;
  search_result: SearchResultType[];
  shippingValue: number;
  right?: string;
  bottom?: string;
  shippingTypes: ShippingTypeType[];
  setOpenCalcPopup: (value: boolean) => void;
  setShippingValue: (value: number) => void;
  mode: CurrentShippingType;
  setMode: (value: CurrentShippingType) => void;
  cargo_groups: CargoGroupType[] | null;
  packaging_types: PackagingType[] | null;
  disabled: any;
  search_success: boolean;
  setDuplicatedCargoError: (value: string) => void;
  duplicatedCargoError: string;
  origin_ports: PortType[];
  destination_ports: PortType[];
  frozen_choices: ChoiceType[];
  origin_port_value: PortType | null;
  container_types: ContainerType[];
};

const DashboardPage: React.FC<PropsType> = ({
  setWidgetsVisible,
  widgetsVisible,
  search_result,
  shippingValue,
  setOpenCalcPopup,
  setShippingValue,
  setMode,
  mode,
  cargo_groups,
  packaging_types,
  container_types,
  search_success,
  duplicatedCargoError,
  setDuplicatedCargoError,
  shippingTypes,
  origin_ports,
  destination_ports,
  frozen_choices,
  origin_port_value,
}) => {
  return (
    <DashboardWrapper>
      <MapComponent
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<MapWrapper />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {search_success && <Back />}
      <SearchBox widgetsVisible={widgetsVisible}>
        <Search
          setOpenCalcPopup={setOpenCalcPopup}
          shippingValue={shippingValue}
          setShippingValue={setShippingValue}
          setMode={setMode}
          mode={mode}
          cargo_groups_list={cargo_groups}
          packaging_types={packaging_types}
          container_types={container_types}
          disabled={search_success}
          search_result={search_result}
          search_success={search_success}
          duplicatedCargoError={duplicatedCargoError}
          setDuplicatedCargoError={setDuplicatedCargoError}
          shippingTypes={shippingTypes}
          origin_ports={origin_ports}
          destination_ports={destination_ports}
          frozen_choices={frozen_choices}
          origin_port_value={origin_port_value}
        />
        {search_success && (
          <SearchContainer
            search_result={search_result}
            shippingValue={shippingValue}
          />
        )}
      </SearchBox>
      {!search_success && (
        <MultiWidgetBox widgetsVisible={widgetsVisible}>
          <FeePaymentWidget />
          <LatestQuotesWidget />
          <RackingStatusWidget />
        </MultiWidgetBox>
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
