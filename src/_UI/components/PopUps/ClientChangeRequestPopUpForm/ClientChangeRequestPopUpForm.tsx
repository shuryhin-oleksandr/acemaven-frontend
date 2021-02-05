import React from "react";
import { PopupContainer, PopupContent } from "./charge-request-form-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";
import { IconButton } from "@material-ui/core";
import AddingGroupsForm from "../ClientOperationChangeRequestPopUp/AddingGroupsForm/AddingGroupsForm";
import { OperationType } from "../../../../_BLL/types/operations/operationsTypes";
import { CargoGroupQuoteType } from "../../../../_BLL/types/quotes/quotesTypes";

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
  operation_info: OperationType;
  group?: CargoGroupQuoteType;
  reCalcOnGroupsAmountChange: any;
  setEditableGroupIndex: (value: number) => void;
};

const ClientChangeRequestPopUpForm: React.FC<PropsTypes> = ({
  setIsOpen,
  operation_info,
  group,
  reCalcOnGroupsAmountChange,
  setEditableGroupIndex,
}) => {
  return (
    <PopupContainer>
      <PopupContent>
        <IconButton
          onClick={() => {
            setIsOpen(false);
            setEditableGroupIndex(-1);
          }}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close} alt="" />
        </IconButton>
        <AddingGroupsForm
          setAddGroupMode={setIsOpen}
          shipping_mode={operation_info.freight_rate.shipping_mode.id}
          shipping_type={operation_info.shipping_type}
          reCalcOnGroupsAmountChange={reCalcOnGroupsAmountChange}
          group={group}
          setEditableGroupIndex={setEditableGroupIndex}
        />
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientChangeRequestPopUpForm;
