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
import { CurrentShippingType } from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { OperationType } from "../../../../_BLL/types/operations/operationsTypes";
import ClientOperationTable from "./table/ClientOperationTable";

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
};
const ClientOperationsListContainer: React.FC<PropsType> = ({
  setSearchMode,
  ...props
}) => {
  const [isHide, setIsHide] = useState(true);


  return (
    <OperationsWrapper>
      {!isHide && (
        <div
          style={{
            width: "100%",
            height: "490px",
            backgroundColor: "rgba(0, 0, 0, .07",
          }}
        />
      )}
      <OperationsInner>
        <HideButton
          isHide={isHide}
          onClick={() => (isHide ? setIsHide(false) : setIsHide(true))}
        >
          <img src={hide_map_icon} alt="" />
        </HideButton>
        <OperationsContent>
          <OperationHeader>
            <OperationTitle>Operations</OperationTitle>
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
              />
              <OptionsDeliveryButtons
                mode={props.mode}
                setMode={props.setMode}
                searchValue={props.searchValue}
                searchColumn={props.search_column}
                directory=""
                thunkName="operations"
                my_operations={props.my_operations}
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
          />
        </OperationsContent>
      </OperationsInner>
    </OperationsWrapper>
  );
};

export default ClientOperationsListContainer;
