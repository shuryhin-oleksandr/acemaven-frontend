import React, { useState } from "react";
import {
  OperationHeader,
  OperationsContent,
  OperationsInner,
  OperationsWrapper,
  HideButton,
  OperationTitle,
} from "../agent/agent-operations-list-container";
import hide_map_icon from "../../../assets/icons/operations/hide_map.svg";
import OptionsOperationButtons from "../../../components/_commonComponents/optionsButtons/operations/OptionsOperationButtons";
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import {CurrentShippingType, ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { OperationType } from "../../../../_BLL/types/operations/operationsTypes";
import ClientOperationTable from "./table/ClientOperationTable";
import MapComponent from "../../dashboard/MapComponent/MapComponent";
import { MapWrapper } from "../../dashboard/dashboard-styles";
import {
  autoTrackWithEventsHelper,
  manualTrackWithEventsHelper
} from "../../../../_BLL/helpers/tracker/autoTracksWithEventsHelper";
import {useTranslation} from "react-i18next";

type PropsType = {
  setSearchMode: (value: boolean) => void;
  isSearchMode: boolean;
  mode: string;
  setMode: (value: CurrentShippingType) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  search_column: string;
  setSearchColumn: (value: string) => void;
  my_operations: string;
  setMyOperations: (value: string) => void;
  operations_list: OperationType[];
  operation_status: string;
};
const ClientOperationsListContainer: React.FC<PropsType> = ({
  setSearchMode,
  ...props
}) => {
  const [isHide, setIsHide] = useState(false);

  // SEA
  let events = [...autoTrackWithEventsHelper(props.operations_list), ...manualTrackWithEventsHelper(props.operations_list)]

  //AIR
  let air_events = [...autoTrackWithEventsHelper(props.operations_list), ...manualTrackWithEventsHelper(props.operations_list)]
  const {t} = useTranslation();
  return (
    <OperationsWrapper>
      {!isHide && props.operation_status === 'active' && (
        <MapComponent
          isMarkerShown={false}
          loadingElement={<div style={{ height: `420px` }} />}
          containerElement={<MapWrapper />}
          mapElement={<div style={{ height: `420px` }} />}
          events={(props.mode === ShippingTypesEnum.SEA) ? events : air_events}
        />
      )}
      <OperationsInner>
        {props.operation_status === 'active' && <HideButton
          isHide={isHide}
          onClick={() => (isHide ? setIsHide(false) : setIsHide(true))}
        >
          <img src={hide_map_icon} alt="" />
        </HideButton>}
        <OperationsContent isHide={isHide} status={props.operation_status}>
          <OperationHeader>
            <OperationTitle>{t("Operations/Operations")}</OperationTitle>
            <div
              style={{
                display: "flex",
                width: "315px",
                justifyContent: "space-between",
              }}
            >
              <OptionsOperationButtons
                mode={props.mode}
                setMode={props.setMode}
                searchValue={props.searchValue}
                searchColumn={props.search_column}
                directory=""
                my_operations={props.my_operations}
                setMyOperations={props.setMyOperations}
                thunkName="operations_client"
                operation_status={props.operation_status}
              />
              <OptionsDeliveryButtons
                mode={props.mode}
                setMode={props.setMode}
                searchValue={props.searchValue}
                searchColumn={props.search_column}
                directory=""
                thunkName="operations_client"
                my_operations={props.my_operations}
                operation_status={props.operation_status}
              />
            </div>
          </OperationHeader>
          <ClientOperationTable
            setSearchMode={setSearchMode}
            isSearchMode={props.isSearchMode}
            mode={props.mode}
            setMode={props.setMode}
            searchValue={props.searchValue}
            setSearchValue={props.setSearchValue}
            search_column={props.search_column}
            setSearchColumn={props.setSearchColumn}
            operations_list={props.operations_list}
            my_operations={props.my_operations}
            operation_status={props.operation_status}
          />
        </OperationsContent>
      </OperationsInner>
    </OperationsWrapper>
  );
};

export default ClientOperationsListContainer;
