import React from "react";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
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
import {getClientQuotesThunk} from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getFilteredRateListThunk} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {getAgentQuotesListThunk} from "../../../../../_BLL/thunks/quotes/agentQuotesThunk";

type PropsType = {
  setMode?: VoidFunctionType;
  mode: string;
  dispatch?: VoidFunctionType;
  directory: string;
  searchColumn: string;
  searchValue: string;
  setShippingValue?: (shippingModeId: number) => void;
  disabled?:boolean;
  thunkName?: string
};

const OptionsDeliveryButtons: React.FC<PropsType> = ({
  setMode,
  mode, disabled,
  ...props
}) => {
  let dispatchDeliveryHandler = (type: string) => {
    setMode && setMode(type);
    props.setShippingValue && props.setShippingValue(0)
    if(props.thunkName === 'quotes') {
      props.dispatch && props.dispatch(getClientQuotesThunk(
          type,
          "",
          props.searchColumn,
          props.searchValue))
    } else if(props.thunkName === 'quotes_agent') {
      props.dispatch && props.dispatch(
          getAgentQuotesListThunk(
              type,
              "",
              props.searchColumn,
              props.searchValue
          )
      )
    } else if (props.thunkName === 'rates') {
      props.dispatch && props.dispatch(
          getFilteredRateListThunk(
              props.directory,
              type,
              "",
              props.searchColumn,
              props.searchValue
          )
      )
    } else {
      props.dispatch &&
      props.dispatch(
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
      <OptionButton onClick={() => {!disabled && dispatchDeliveryHandler("sea")}} mode={mode}>
        <img src={mode === "sea" ? shipActive : ship} alt="" />
      </OptionButton>
      <OptionButtonPlane
        onClick={() => {!disabled && dispatchDeliveryHandler("air")}}
        mode={mode}
      >
        <img src={mode === "air" ? planeActive : plane} alt="" />
      </OptionButtonPlane>
    </OptionsButtonsWrap>
  );
};

export default OptionsDeliveryButtons
