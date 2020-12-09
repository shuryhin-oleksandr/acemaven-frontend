import React from "react";
import {
  OptionButton,
  OptionButtonPlane,
  OptionsButtonsWrap,
} from "../../../../Pages/Services&Rates/surcharge/register_new_surcharge/form-styles";
import shipActive from "../../../../assets/icons/rates&services/Ship.svg";
import ship from "../../../../assets/icons/rates&services/ShipDefault.svg";
import planeActive from "../../../../assets/icons/rates&services/PlanActive.svg";
import plane from "../../../../assets/icons/rates&services/Plan.svg";
import { filterByThunk } from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import { getClientQuotesThunk } from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import { getFilteredRateListThunk } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { getAgentQuotesListThunk } from "../../../../../_BLL/thunks/quotes/agentQuotesThunk";
import { getBookingRequestListThunk } from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import { getAgentsOperationsThunk } from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import { useDispatch } from "react-redux";
import { CurrentShippingType } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";

type PropsType = {
  setMode?: (value: CurrentShippingType) => void;
  mode: string;
  dispatch?: any;
  directory: string;
  searchColumn: string;
  searchValue: string;
  setShippingValue?: (shippingModeId: number) => void;
  disabled?: boolean;
  thunkName?: string;
  my_operations?: string;
  operation_status?: string
};

const OptionsDeliveryButtons: React.FC<PropsType> = ({
  setMode,
  mode,
  disabled,
  ...props
}) => {
  const dispatch = useDispatch();

  let dispatchDeliveryHandler = (type: CurrentShippingType) => {
    setMode && setMode(type);
    props.setShippingValue && props.setShippingValue(0);
    if (props.thunkName === "quotes") {
      dispatch(
        getClientQuotesThunk(type, "", props.searchColumn, props.searchValue)
      );
    } else if (props.thunkName === "quotes_agent") {
      dispatch(
        getAgentQuotesListThunk(type, "", props.searchColumn, props.searchValue)
      );
    } else if (props.thunkName === "rates") {
      dispatch(
        getFilteredRateListThunk(
          props.directory,
          type,
          "",
          props.searchColumn,
          props.searchValue
        )
      );
    } else if (props.thunkName === "operations") {
      props.my_operations === "mine"
        ? dispatch(
            getAgentsOperationsThunk(
              type,
              true,
              "",
              props.searchColumn,
              props.searchValue,
                props.operation_status
            )
          )
        : dispatch(
            getAgentsOperationsThunk(
              type,
              "",
              "",
              props.searchColumn,
              props.searchValue,
                props.operation_status
            )
          );
    } else if (props.thunkName === "agent_booking") {
      dispatch(
        getBookingRequestListThunk(
          type,
          "",
          props.searchColumn,
          props.searchValue
        )
      );
    } else if (props.thunkName === "search_widget") {
      return;
    } else {
      dispatch(
        filterByThunk(
          props.directory,
          type,
          "",
          props.searchColumn,
          props.searchValue
        )
      );
    }
  };

  return (
    <OptionsButtonsWrap>
      <OptionButton
        onClick={() => {
          !disabled && dispatchDeliveryHandler("sea");
        }}
        mode={mode}
      >
        <img src={mode === "sea" ? shipActive : ship} alt="" />
      </OptionButton>
      <OptionButtonPlane
        onClick={() => {
          !disabled && dispatchDeliveryHandler("air");
        }}
        mode={mode}
      >
        <img src={mode === "air" ? planeActive : plane} alt="" />
      </OptionButtonPlane>
    </OptionsButtonsWrap>
  );
};

export default OptionsDeliveryButtons;
